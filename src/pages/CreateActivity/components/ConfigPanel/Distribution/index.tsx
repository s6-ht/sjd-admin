import { Form, FormInstance, Radio, Switch } from "antd";
import styles from "../index.less";
import { useState } from "react";
import { EBooleanFlag, EGetDistributionType } from "@/services/activity/types";
import classNames from "classnames";
import RankPriceSettings from "./RankPriceSettings";
import { IConfigFormValues } from "@/pages/CreateActivity/types";
import {
  transformBooleanToNum,
  validateDistributionPrice,
} from "@/pages/CreateActivity/helper";
import { useUpdateEffect } from "ahooks";

interface IBaseConfigProps {
  form: FormInstance<IConfigFormValues>;
  onChangeFormValues: (
    data: Partial<IConfigFormValues>,
    needUpdateForm?: boolean
  ) => void;
  showDistributionError: boolean;
  distributionFlag?: EBooleanFlag;
}

const Distribution = ({
  form,
  onChangeFormValues,
  showDistributionError,
  distributionFlag = EBooleanFlag.FALSE,
}: IBaseConfigProps) => {
  const distribution1MinPrice = Form.useWatch("distribution1MinPrice", form);
  const distribution1MaxPrice = Form.useWatch("distribution1MaxPrice", form);
  const distribution2MinPrice = Form.useWatch("distribution2MinPrice", form);
  const distribution2MaxPrice = Form.useWatch("distribution2MaxPrice", form);
  const payPrice = Form.useWatch("payPrice", form);

  // 显示分销金额的错误信息
  const [showError, setShowError] = useState(showDistributionError);
  useUpdateEffect(() => {
    setShowError(showDistributionError);
  }, [showDistributionError]);

  const onChangeDistributionPrice = (key: string, val: number) => {
    const maxPrice = distribution1MaxPrice ?? 0 + distribution2MaxPrice ?? 0;

    const data: any = { distributionTotalPrice: maxPrice };
    if (val === null) {
      data[key] = 0;
    }

    onChangeFormValues(data, false);
    validateDistributionPrice(maxPrice, payPrice, setShowError);
  };

  return (
    <>
      <div className={styles.flexRowBetweenCenter}>
        <div className={classNames(styles.formItemLabel, styles.noMargin)}>
          开启分销
        </div>
        <Switch
          checked={distributionFlag === EBooleanFlag.TRUE}
          onChange={(open) =>
            onChangeFormValues({
              distributionFlag: transformBooleanToNum(open),
            })
          }
        />
      </div>
      {distributionFlag === EBooleanFlag.TRUE && (
        <>
          <Form.Item
            label="获得佣金规则"
            className={styles.minMarginBottom}
            style={{ marginTop: 8 }}
            name="getDistributionRule"
          >
            <Radio.Group>
              {getDistributionTypes.map((item) => (
                <Radio key={item.key} value={item.key}>
                  <div className={styles.flexRowAlignCenter}>
                    <span>{item.label}</span>
                    <span className={styles.tip}>{item.desc}</span>
                  </div>
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="分销金额">
            <div className={styles.customContent} style={{ marginTop: 0 }}>
              <RankPriceSettings
                label="1级分销发放金额"
                minPriceKey="distribution1MinPrice"
                maxPriceKey="distribution1MaxPrice"
                minPrice={distribution1MinPrice}
                maxPrice={distribution1MaxPrice}
                showError={showError}
                onBlur={onChangeDistributionPrice}
              />
              <RankPriceSettings
                label="2级分销发放金额"
                minPriceKey="distribution2MinPrice"
                maxPriceKey="distribution2MaxPrice"
                minPrice={distribution2MinPrice}
                maxPrice={distribution2MaxPrice}
                showError={showError}
                onBlur={onChangeDistributionPrice}
              />
              {showDistributionError && (
                <div className={styles.formItemError}>
                  1级分销发放的最高金额和2级分销发放的最高金额的和不能超过商品的支付价
                </div>
              )}
              <ul className={styles.tipContainer}>
                <div className={styles.tip}>提示：</div>
                {tips.map((item) => (
                  <li className={styles.tip} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Form.Item>
        </>
      )}
    </>
  );
};
export default Distribution;

const tips = [
  "金额区间相同时为固定金额，不同时按区间随机发放；",
  "1级分销发放的最高金额和2级分销发放的最高金额的和不能超过商品的支付价；",
  "金额填写为0时，不启用对应等级的分销。区间设置相同，发放",
];

const getDistributionTypes = [
  {
    key: EGetDistributionType.BUY,
    label: "需要购买",
    desc: "a必须先购买，分享给b，b下 单，a获得分销佣金",
  },
  {
    key: EGetDistributionType.SHARE,
    label: "不需要购买",
    desc: "不论a是否购买，分享给b，b下单，a获得分销佣金",
  },
];
