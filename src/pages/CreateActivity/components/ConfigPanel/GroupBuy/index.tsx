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
import ConfigItemTitle from "../components/ConfigItemTitle";
import styles from "../index.less";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { EBooleanFlag } from "@/services/activity/types";
import {
  IConfigFormValues,
  TCreateLadderItem,
} from "@/pages/CreateActivity/types";
import { transformBooleanToNum } from "@/pages/CreateActivity/helper";
import { genId } from "@/common/utils/genId";
import { useDebounceFn } from "ahooks";
import classNames from "classnames";

const LADDER_LIMIT = 5;

interface IBaseConfigProps {
  form: FormInstance<IConfigFormValues>;
  onChangeFormValues: (
    data: Partial<IConfigFormValues>,
    needUpdateForm?: boolean
  ) => void;
  ladderList: TCreateLadderItem[];
  originalPriceShow?: EBooleanFlag;
}

const GroupBuy = ({
  form,
  onChangeFormValues,
  ladderList,
  originalPriceShow = EBooleanFlag.TRUE,
}: IBaseConfigProps) => {
  const singleBuy = Form.useWatch("singleBuy", form);
  const singlePrice = Form.useWatch("singlePrice", form);

  const changeLadderInfo = (id: string, data: Record<string, number>) => {
    const newLadderList = ladderList.map((item) =>
      item.id === id ? { ...item, ...data } : item
    );
    onChangeFormValues({ ladderList: newLadderList }, false);
  };

  const { run: changeLadderInfoDebounce } = useDebounceFn(
    (id: string, data: Record<string, number>) => {
      changeLadderInfo(id, data);
    },
    { wait: 300 }
  );

  return (
    <div className={styles.groupBuy}>
      <div className={styles.flexRowBetweenWithGap}>
        <UploadImg imgWidth={108} />
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
                  onChangeFormValues({ goodsName: "商品" });
                }
              }}
            />
          </Form.Item>
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
              onChange={(e) =>
                onChangeFormValues(
                  {
                    originalPriceShow: transformBooleanToNum(e.target.checked),
                  },
                  false
                )
              }
            >
              显示原价
            </Checkbox>
          </div>
          <div className={styles.flexRowBetweenWithGap}>
            <Form.Item name="goodsNum" className={styles.minMarginBottom}>
              <InputNumber
                addonBefore="商品数量"
                style={{ width: 150 }}
                min={0}
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
      <Form.Item name="singlePrice" required>
        <InputNumber style={{ width: "100%" }} addonBefore="单买价" />
      </Form.Item>
      <div className={styles.customContainer}>
        <ConfigItemTitle
          title={<div className={styles.coverLabel}>拼团价格配置</div>}
        />
        <div className={classNames(styles.customContent, styles.ladderList)}>
          {ladderList.map((item, index) => (
            <div key={item.id} className={styles.ladderItem}>
              <div className={styles.label}>阶梯{index + 1}</div>
              <div className={styles.flexRowBetweenWithGap}>
                <InputNumber
                  defaultValue={item.groupNum}
                  style={{ width: "100%" }}
                  addonBefore="成团人数"
                  min={1}
                  onChange={(val) => {
                    changeLadderInfoDebounce(item.id, { groupNum: val || 0 });
                  }}
                />
                <InputNumber
                  defaultValue={item.groupPrice}
                  style={{ width: "100%" }}
                  addonBefore="拼团价"
                  min={0}
                  onChange={(val) => {
                    changeLadderInfoDebounce(item.id, { groupPrice: val || 0 });
                  }}
                />
                {ladderList.length > 1 && (
                  <DeleteOutlined
                    onClick={() => {
                      const newLadderList = ladderList.filter(
                        (ladder) => ladder.id !== item.id
                      );
                      onChangeFormValues({ ladderList: newLadderList });
                    }}
                  />
                )}
              </div>
            </div>
          ))}
          {ladderList.length <= LADDER_LIMIT && (
            <Button
              style={{ marginTop: 4 }}
              type="dashed"
              onClick={() => {
                onChangeFormValues({
                  ladderList: [...ladderList, genLadderItem()],
                });
              }}
              icon={<PlusOutlined />}
              block
            >
              添加阶梯
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default GroupBuy;

export function genLadderItem() {
  return { id: genId(), groupNum: 1, groupPrice: 0 };
}
