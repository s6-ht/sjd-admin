import { genId } from "@/common/utils/genId";
import {
  EBooleanFlag,
  EContentType,
  EGetDistributionType,
} from "@/services/activity/types";
import dayjs, { Dayjs } from "dayjs";
import { IConfigFormValues } from "./types";

export const defaultCreateActivityValues: IConfigFormValues = {
  themeColor: "red",
  title: "粽情端午免单节，198元组团抢购最高10节",
  titleShow: EBooleanFlag.TRUE,
  backgroundColor: "",
  activityTimeRange: [
    dayjs().subtract(1, "day").set("hour", 12).set("minute", 30),
    dayjs().add(1, "day").set("hour", 18).set("minute", 10),
  ],
  countTimeBcgColor: "red",
  countTimeTextColor: "#fff",
  shareCardContent: "粽情端午免单节，198元组团抢购最高10节，快来抢购吧",
  goodsName: "商品名称",
  originalPrice: 1,
  originalPriceShow: EBooleanFlag.TRUE,
  goodsNum: 1,
  payPrice: 1,
  buyButtonText: "立即开团",
  writeOffTime: dayjs()
    .add(30, "day")
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0),
  canUsedTime: 90,
  singleBuy: EBooleanFlag.FALSE,
  singlePrice: 1,
  ladderList: [
    {
      id: genId(),
      groupNum: 1,
      groupPrice: 1,
    },
  ],
  autoFill: EBooleanFlag.FALSE,
  showGroup: EBooleanFlag.FALSE,
  distributionFlag: EBooleanFlag.TRUE,
  getDistributionRule: EGetDistributionType.BUY,
  distribution1MinPrice: 0,
  distribution1MaxPrice: 0,
  distribution2MinPrice: 0,
  distribution2MaxPrice: 0,
  distributionTotalPrice: 0,
  signUps: [
    {
      id: genId(),
      contentTypeName: EContentType.INPUT,
      isNotNull: EBooleanFlag.TRUE,
      content: "联系人姓名",
    },
    {
      id: genId(),
      contentTypeName: EContentType.INPUT,
      isNotNull: EBooleanFlag.TRUE,
      content: "手机号",
      disabled: true
    },
  ],
};
