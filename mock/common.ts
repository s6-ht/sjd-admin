import { IResponse } from "@/typings/request";
import _ from "lodash";

type IOverwrite<T> = Partial<IResponse<T>>;

export default function getResponse<T>(
  data: T,
  overwrite: IOverwrite<T> = {}
): IResponse<T> {
  return {
    data,
    code: 200,
    message: "",
    ...overwrite,
  };
}
