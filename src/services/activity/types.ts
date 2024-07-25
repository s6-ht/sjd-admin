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
  signUps: {
    /** 信息类型 */
    contentTypeName: string;
    /** 是否必填 */
    isNotNull: EBooleanFlag;
    maxSelect: number;
    content: string;
  };
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
      /** 一级分销最低金额 */
      distribution1MinPrice: number;
      /** 一级分销最高金额 */
      distribution1MaxPrice: number;
      /** 二级分销最低金额 */
      distribution2MinPrice: number;
      /** 二级分销最高金额 */
      distribution2MaxPrice: number;
      /** 拼团阶梯信息 */
      ladderList: {
        groupNum: number;
        groupPrice: number;
      }[];
    };
    bargain?: {
      goodsName: number;
      goodsNum: number;
      originalPrice: number;
      originalPriceShow: EBooleanFlag;
      payPrice: number;
      /** 底价 */
      basePrice: number;
      /** 最低邀请人数 */
      inviteNumMin: number;
      /** 最多邀请人数 */
      inviteNumMax: number;
      /** 活动结束后是否可继续购买 */
      activityEndBuy: EBooleanFlag;
      /** 活动结束后x小时可继续购买 */
      activityEndBuyHour: number;
      /** 是否允许按照当前砍至价格购买 */
      currentPriceBuy: EBooleanFlag;
      /** 首刀砍掉50% */
      cutOffHalf: EBooleanFlag;
    };
  };
}
