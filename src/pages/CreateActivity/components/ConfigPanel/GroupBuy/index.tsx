import UploadImg from "@/components/UploadImg";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Switch,
} from "antd";
import { IConfigFormValues } from "..";
import ConfigItemTitle from "../components/ConfigItemTitle";
import styles from "../index.less";
import { useCallback, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { EBooleanFlag } from "@/services/activity/types";

interface IBaseConfigProps {
  form: FormInstance<IConfigFormValues>;
  onChangeFormValues: (data: Partial<IConfigFormValues>) => void;
}

const GroupBuy = ({ form, onChangeFormValues }: IBaseConfigProps) => {
  const originalPriceShow = Form.useWatch("originalPriceShow", form);
  const singleBuy = Form.useWatch("singleBuy", form);
  const singlePrice = Form.useWatch("singlePrice", form);

  const onChange = useCallback(
    (key: keyof IConfigFormValues, value: any) => {
      form.setFieldValue(key, value);
      onChangeFormValues({ [key]: value });
    },
    [onChangeFormValues]
  );

  return (
    <div className={styles.groupBuy}>
      <div className={styles.flexRowBetweenWithGap}>
        <Form.Item name="goodsPic">
          <UploadImg imgWidth={108} />
        </Form.Item>
        <div className={styles.flexColumnStart}>
          <Form.Item name="goodsName" className={styles.minMarginBottom}>
            <Input.TextArea
              style={{ width: "100%" }}
              maxLength={50}
              showCount
              placeholder="请输入商品名称"
              onBlur={() => {
                const goodsName = form.getFieldValue("goodsName");
                if (!goodsName?.trim()) {
                  onChange("goodsName", "商品1");
                }
              }}
            />
          </Form.Item>
          <Form.Item name={"originalPriceShow"} hidden />
          <div className={styles.flexRowBetweenCenter}>
            <Form.Item name="originalPrice" className={styles.minMarginBottom}>
              <InputNumber
                addonBefore="原价￥"
                style={{ width: 150 }}
                min={0}
              />
            </Form.Item>
            <Checkbox
              checked={originalPriceShow === EBooleanFlag.TRUE}
              className={styles.minMarginBottom}
              onChange={(checked) => {
                const value = checked ? EBooleanFlag.FALSE : EBooleanFlag.TRUE;
                onChange("originalPriceShow", value);
              }}
            >
              显示原价
            </Checkbox>
          </div>
          <div className={styles.flexRowBetweenWithGap}>
            <Form.Item name="goodsNum" className={styles.minMarginBottom}>
              <InputNumber
                addonBefore="商品数量"
                style={{ width: 150 }}
                min={1}
              />
            </Form.Item>
            <Form.Item
              name="payPrice"
              className={styles.minMarginBottom}
              rules={[
                {
                  message: "支付价格必须等于单买价格",
                  validator(rule, value, callback) {
                    if (singleBuy && singlePrice !== value) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber
                addonBefore="支付价￥"
                style={{ width: 150 }}
                min={0}
              />
            </Form.Item>
          </div>
        </div>
      </div>
      <Form.Item name="buyButtonText" className={styles.minMarginBottom}>
        <Input addonBefore="拼团按钮文案" />
      </Form.Item>
      <div>
        <div className={styles.formItemLabel}>自动核销期限</div>
        <div className={styles.flexRowStart}>
          <Form.Item
            name="writeOffTime"
            className={styles.minMarginBottom}
            style={{ flex: 1 }}
          >
            <DatePicker
              allowClear={false}
              showTime
              style={{ borderRadius: "6px 0 0 6px", width: "100%" }}
            />
          </Form.Item>
          <div className={styles.addonAfter}>前未核销的订单将自动核销</div>
        </div>
      </div>
      <Form.Item
        name="canUsedTime"
        label="商品使用有效期"
        className={styles.minMarginBottom}
      >
        <InputNumber
          style={{ width: "100%" }}
          addonBefore="自核销之日起"
          addonAfter="天内使用"
          min={0}
        />
      </Form.Item>
      <div className={styles.flexRowBetweenCenter} style={{ marginBottom: 8 }}>
        <div className={styles.formItemLabel}>
          <span>开启单买模式</span>
          <span className={styles.tip}>开启后用户可不开团，直接购买商品</span>
        </div>
        <Switch size="small" />
      </div>
      <Form.Item required>
        <InputNumber style={{ width: "100%" }} addonBefore="单买价" />
      </Form.Item>
      <div className={styles.customContainer}>
        <ConfigItemTitle
          title={<div className={styles.coverLabel}>拼团价格配置</div>}
        />
        <div className={styles.customContent}>
          <div className={styles.customItem}>
            <div className={styles.label}>阶梯1</div>
            <div className={styles.flexRowBetweenWithGap}>
              <InputNumber style={{ width: "100%" }} addonBefore="成团人数" />
              <InputNumber style={{ width: "100%" }} addonBefore="拼团价" />
              <DeleteOutlined />
            </div>
          </div>
          <Button style={{ marginTop: 12 }} type="dashed" block>
            添加阶梯
          </Button>
        </div>
      </div>
    </div>
  );
};
export default GroupBuy;
