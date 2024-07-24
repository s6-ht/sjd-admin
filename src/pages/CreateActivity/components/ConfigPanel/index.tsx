import { Button, Collapse, Form } from "antd";
import BaseConfig from "./BaseConfig";
import styles from "./index.less";
import BlockTitle from "./components/BlockTitle";
import { useState } from "react";
import { history } from "umi";
import { ICreateActivityReq } from "@/services/activity/types";

const ConfigPanel = () => {
  const [expandKeys, setExpandKeys] = useState(["BASE_CONFIG"]);

  const [form] = Form.useForm<IConfigFormValues>();

  const onPublish = () => {
    form.validateFields().then((values) => {
      console.log(values);
    });
  };

  return (
    <Form form={form} layout="vertical" className={styles.configPanel}>
      <Collapse
        expandIconPosition="end"
        activeKey={expandKeys}
        onChange={(keys) => setExpandKeys(keys as string[])}
        items={[
          {
            key: "BASE_CONFIG",
            label: <BlockTitle title="基础样式配置" />,
            children: <BaseConfig form={form} />,
          },
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
  extends Omit<ICreateActivityReq, "coverUrl"> {
  cover: File;
}
