export enum EApiCode {
  SUCCESS = 200,
  FAILED = 500,
  NO_REGISTERED = 701,
  TOKEN_EXPIRED = 401,
  NO_AUTH = 403,
  SYSTEM_ERROR = 900,
}

// 统一的接口返回格式
export interface IResponse<T> {
  data: T;
  code: EApiCode;
  message?: string;
}

export interface IGetListRes<T> {
  list: T[];
  pageIndex: number; // 页面展示条数
  pageSize: number; // 当前页面
  total: number; // 总页数
}
