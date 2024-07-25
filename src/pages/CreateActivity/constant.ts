import { EBooleanFlag } from "@/services/activity/types";
import dayjs, { Dayjs } from "dayjs";

export const defaultCreateActivityValues = {
  themeColor: "red",
  title: "粽情端午免单节，198元组团抢购最高10节",
  titleShow: true,
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
  singleBuy: true,
  singlePrice: 1,
};
