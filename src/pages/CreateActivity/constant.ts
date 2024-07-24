import dayjs, { Dayjs } from "dayjs";

export const defaultCreateActivityValues = {
  themeColor: "red",
  title: "粽情端午免单节，198元组团抢购最高10节",
  titleShow: true,
  backgroundColor: "",
  dateRange: [
    dayjs().subtract(1, "day").set("hour", 12).set("minute", 30),
    dayjs().add(1, "day").set("hour", 18).set("minute", 10),
  ],
  countTimeBcgColor: "red",
  countTimeTextColor: "#fff",
};
