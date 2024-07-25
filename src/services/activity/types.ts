export enum ETemplateType {
  GROUP_BUY = "GroupBuy",
  BARGAIN = "bargain",
  DISTRIBUTION = "DISTRIBUTION",
}

export interface IGetTemplateListReq {
  current: number;
  size?: number;
  name?: string;
  type?: string;
}

export interface IActivityTemplateInfo {
  id: string;
  coverUrl: string;
  homePageUrl: string;
  url: string;
  name: string;
  remark: string;
  tags: ETemplateType[];
}

export enum EBooleanFlag {
  TRUE = 1,
  FALSE = 0,
}

export interface ILadderItem {
  groupNum: number;
  groupPrice: number;
}
export interface ISignUpInfo {
  id: string;
  /** 信息项类型 */
  contentTypeName: EContentType;
  /** 是否必填 */
  isNotNull: EBooleanFlag;
  maxSelect?: number;
  content: string;
  disabled?: boolean;
  options?: string[];
}

export enum EContentType {
  INPUT = "INPUT",
  RADIO = "RADIO",
  MULTIPLE = "MULTIPLE",
}

export enum EGetDistributionType {
  BUY = "buy",
  SHARE = "share",
}

export interface ICreateActivityReq {
  coverUrl: string;
  title: string;
  titleShow?: EBooleanFlag;
  startTime: number;
  endTime: number;
  backgroundColor?: string;
  /** 倒计时背景色 */
  countTimeBcgColor?: string;
  /** 倒计时字体颜色 */
  countTimeTextColor?: string;
  /** 分享封面 */
  shareCardCoverUrl?: string;
  /** 分享标题 */
  shareCardContent?: string;
  signUps: ISignUpInfo[];
  activityDetail: {
    groupBy: {
      /** 商品图片 */
      goodsPicUrl?: string;
      goodsName: string;
      originalPriceShow: EBooleanFlag;
      payPrice: number;
      /** 最晚自动核销时间 */
      autoWriteOffTime: number;
      /** 最晚使用时间 */
      canUsedTime: number;
      /** 拼团按钮文案 */
      buyButtonText?: string;
      singleBuy: EBooleanFlag;
      singlePrice: number;
      /** 显示开团列表 */
      showGroup: EBooleanFlag;
      /** 活动结束自动满团 */
      autoFill: EBooleanFlag;
      /** 开启分销 */
      distributionFlag: EBooleanFlag;
      /** 获取佣金规则 */
      getDistributionRule: string;
      /** 一级分销最低金额 */
      distribution1MinPrice: number;
      /** 一级分销最高金额 */
      distribution1MaxPrice: number;
      /** 二级分销最低金额 */
      distribution2MinPrice: number;
      /** 二级分销最高金额 */
      distribution2MaxPrice: number;
      /** 拼团阶梯信息 */
      ladderList: ILadderItem[];
    };
  };
}
