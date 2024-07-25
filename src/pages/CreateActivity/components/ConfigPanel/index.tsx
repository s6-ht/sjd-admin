import { Button, Collapse, Form } from "antd";
import BaseConfig from "./BaseConfig";
import styles from "./index.less";
import BlockTitle from "./components/BlockTitle";
import { useState } from "react";
import { history } from "umi";
import { EBooleanFlag, ICreateActivityReq } from "@/services/activity/types";
import { Dayjs } from "dayjs";
// import ShareSettings from "./ShareSettings";
import { defaultCreateActivityValues } from "../../constant";
import GroupBuy from "./GroupBuy";

interface IConfigPanelProps {
  onChangeFormValues: (data: Partial<IConfigFormValues>) => void;
}

const ConfigPanel = ({ onChangeFormValues }: IConfigPanelProps) => {
  const [expandKeys, setExpandKeys] = useState([
    // "BASE_CONFIG",
    "SHARE_SETTINGS",
    "GROUP_BUY",
  ]);

  const [form] = Form.useForm<IConfigFormValues>();

  const onPublish = () => {
    form.validateFields().then((values) => {
      console.log(values);
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className={styles.configPanel}
      onValuesChange={(data) => {
        console.log(data, "data");
        onChangeFormValues(data);
      }}
      initialValues={defaultCreateActivityValues}
    >
      <Collapse
        expandIconPosition="end"
        activeKey={expandKeys}
        onChange={(keys) => setExpandKeys(keys as string[])}
        items={[
          {
            key: "BASE_CONFIG",
            label: <BlockTitle title="基础样式配置" />,
            children: (
              <BaseConfig onChangeFormValues={onChangeFormValues} form={form} />
            ),
          },
          {
            key: "GROUP_BUY",
            label: <BlockTitle title="拼团商品配置" />,
            children: (
              <GroupBuy onChangeFormValues={onChangeFormValues} form={form} />
            ),
          },
          // {
          //   key: "SHARE_SETTINGS",
          //   label: <BlockTitle title="分享卡片设置" />,
          //   children: (
          //     <ShareSettings
          //       onChangeFormValues={onChangeFormValues}
          //       form={form}
          //     />
          //   ),
          // },
        ]}
      ></Collapse>
      <div className={styles.footer}>
        <Button
          onClick={() => {
            history.go(-1);
          }}
        >
          取消
        </Button>
        <Button type="primary" onClick={onPublish}>
          发布
        </Button>
      </div>
    </Form>
  );
};
export default ConfigPanel;

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
}
