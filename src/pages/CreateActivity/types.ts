import { genId } from "./../../common/utils/genId";
import {
  EBooleanFlag,
  EContentType,
  EGetDistributionType,
  ICreateActivityReq,
  ILadderItem,
  ISignUpInfo,
} from "@/services/activity/types";
import { Dayjs } from "dayjs";

export type TCreateLadderItem = ILadderItem & { id: string };

export interface IConfigFormValues
  extends Omit<ICreateActivityReq, "coverUrl" | "activityDetail"> {
  cover?: File;
  themeColor: string;
  activityTimeRange: Dayjs[];
  shareCardCoverFile?: File;
  goodsPic?: File;
  goodsName: string;
  originalPrice: number;
  originalPriceShow: EBooleanFlag;
  goodsNum: number;
  payPrice: number;
  buyButtonText?: string;
  writeOffTime?: Dayjs;
  canUsedTime?: number;
  singleBuy: EBooleanFlag;
  singlePrice?: number;
  ladderList: TCreateLadderItem[];
  showGroup?: EBooleanFlag;
  autoFill?: EBooleanFlag;
  distributionFlag?: EBooleanFlag;
  distribution1MinPrice: number;
  distribution1MaxPrice: number;
  distribution2MinPrice: number;
  distribution2MaxPrice: number;
  // 一级分销最高发放 + 二级分销最高发放
  distributionTotalPrice: number;
  getDistributionRule: EGetDistributionType;
  signUps: ISignUpInfo[];
}
