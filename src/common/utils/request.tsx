import axios, { AxiosResponse, Method } from "axios";
import qs from "query-string";
import { EApiCode, IResponse } from "@/typings/request";
import { notification } from "antd";
import { history } from "umi";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const workspaceInfo = {};

const baseUrl = process.env.baseUrl || "";

const queryObj: { [key: string]: number } = {};

let showTimeoutModal = false; // 是否弹出登录超时的弹框

const onTimeoutCancel = () => {
  showTimeoutModal = false;
};

export default function ajax<T>(url: string, opt: IRequestOpt): Promise<T> {
  return new Promise((resolve, reject) => {
    const { headers, silent = false } = opt;
    // 处理文件上传的header
    const newHeader = {
      ...(headers ? headers : defaultHeaders),
    };

    axios({
      url: `${baseUrl}${url}`,
      headers: newHeader,
      method: opt.method,
      data: opt.data || {},
    }).then(
      (res: AxiosResponse<IResponse<T>>) => {
        const { code, message, data } = res.data;

        // 登录过期
        if (code === EApiCode.TOKEN_EXPIRED) {
          history.push("/login");
          return;
        }

        if (code !== EApiCode.SUCCESS) {
          if (!silent) {
            // 静默错误模式下，不显示错误信息
            notification.error({
              message: "请求失败",
              description: message,
              style: {
                maxHeight: 500,
                overflow: "auto",
              },
            });
            console.error(res);
          }
          reject(res.data);
          return;
        }
        resolve(data);
      },
      (err) => {
        if (!silent) {
          notification.error({
            message: "请求失败",
          });
        }
        reject(err);
      }
    );
  });
}

export function post<T>(
  url: string,
  data: TReqData = {},
  opt: Partial<IRequestOpt> = {}
): Promise<T> {
  return ajax(url, {
    ...opt,
    data,
    method: "POST",
  });
}

export function get<T>(
  url: string,
  data: TReqData = {},
  opt: Partial<IRequestOpt> = {}
): Promise<T> {
  let finalUrl = url;
  if (url.includes("?")) {
    throw new Error("参数错误");
  }
  const { type, queryKey } = opt;
  // 对于所有的代码添加workspaceId
  const newData = data || {};

  if (newData) {
    finalUrl = `${url}?${qs.stringify(newData)}`;
  }

  if (!type) {
    return ajax(finalUrl, { ...opt, method: "GET" });
  }

  if (!queryKey) {
    throw new Error("参数错误");
  }

  const currentQueryId = new Date().getTime();
  queryObj[queryKey] = currentQueryId;
  return new Promise((resolve, reject) => {
    ajax(finalUrl, { ...opt, method: "GET" })
      .then((resultData) => {
        if (currentQueryId !== queryObj[queryKey]) {
          return;
        }
        resolve(resultData as T);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

type TReqData = object;

export interface IRequestOpt {
  method: Method;
  data?: object;
  headers?: { [key: string]: string };
  type?: ERequestTypes;
  queryKey?: string;
  silent?: boolean; // 接受到错误信息后不展示
}

type ERequestTypes = "latest";
