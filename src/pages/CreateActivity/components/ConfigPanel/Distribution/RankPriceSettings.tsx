import { Form, InputNumber } from "antd";
import styles from "../index.less";
import classNames from "classnames";

const RankPriceSettings = (props: {
  label: string;
  minPriceKey: string;
  maxPriceKey: string;
  minPrice: number;
  maxPrice: number;
  onChange?: () => void;
  onBlur?: (key: string, val: number) => void;
  showError?: boolean;
}) => {
  const {
    label,
    minPriceKey,
    maxPriceKey,
    minPrice,
    maxPrice,
    onChange,
    onBlur,
    showError,
  } = props;

  return (
    <div
      className={classNames(styles.customItem, styles.flexRowBetweenWithGap)}
    >
      <div className={styles.formItemLabel}>{label}</div>
      <div className={styles.distributionPriceItem}>
        <Form.Item name={minPriceKey} className={styles.minMarginBottom}>
          <InputNumber
            style={{ width: 110 }}
            addonBefore="最低"
            min={0}
            onBlur={() => onBlur?.(minPriceKey, minPrice)}
          />
        </Form.Item>
        <span className={styles.gapLine}> — </span>
        <Form.Item
          name={maxPriceKey}
          className={styles.minMarginBottom}
          rules={[
            {
              message: "该值不能小于1级分销最低发放金额",
              validator(rule, value, callback) {
                if (value < minPrice) {
                  return Promise.reject();
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber
            addonBefore="最高"
            style={{ width: 110 }}
            min={minPrice ?? 0}
            status={showError ? "error" : undefined}
            onBlur={() => onBlur?.(maxPriceKey, maxPrice)}
          />
        </Form.Item>
      </div>
    </div>
  );
};
export default RankPriceSettings;
