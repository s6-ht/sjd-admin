import { EBooleanFlag } from "@/services/activity/types";

export function transformBooleanToNum(value: boolean) {
  return value ? EBooleanFlag.TRUE : EBooleanFlag.FALSE;
}

/**
 * 验证支付价格和分销价格
 */
export function validateDistributionPrice(
  distributionTotalPrice: number,
  payPrice: number,
  cb?: (res: boolean) => void
) {
  if (distributionTotalPrice >= payPrice) {
    cb?.(true);
    return Promise.reject();
  }
  cb?.(false);
  return Promise.resolve();
}
