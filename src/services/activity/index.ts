import { get } from "@/common/utils/request";
import { IActivityTemplateInfo, IGetTemplateListReq } from "./types";
import { IGetListRes } from "@/typings/request";

export function getActivityTemplateList(
  data: IGetTemplateListReq
): Promise<IGetListRes<IActivityTemplateInfo>> {
  return get("/web/activity/template/list", data);
}
