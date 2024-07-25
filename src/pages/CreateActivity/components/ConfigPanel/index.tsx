import { Button, Collapse, Form, FormInstance } from "antd";
import BaseConfig from "./BaseConfig";
import styles from "./index.less";
import BlockTitle from "./components/BlockTitle";
import { useCallback, useMemo, useState } from "react";
import { history } from "umi";
import { Dayjs } from "dayjs";
import ShareSettings from "./ShareSettings";
import { defaultCreateActivityValues } from "../../constant";
import { IConfigFormValues, TCreateLadderItem } from "../../types";
import Distribution from "./Distribution";
import SignUpInfo from "./SignUpInfo";
import GroupBuy from "./GroupBuy";
import MerchantInfo from "./MerchantInfo";

interface IConfigPanelProps {
  formValues: IConfigFormValues;
  onChangeFormValues: (
    data: Partial<IConfigFormValues>,
    needUpdateForm?: boolean
  ) => void;
  form: FormInstance<IConfigFormValues>;
  showDistributionError: boolean;
  onPublish: () => void;
}

const ConfigPanel = ({
  onChangeFormValues,
  formValues,
  form,
  showDistributionError,
  onPublish,
}: IConfigPanelProps) => {
  const [expandKeys, setExpandKeys] = useState([
    "BASE_CONFIG",
    "SHARE_SETTINGS",
    "GROUP_BUY",
    "Distribution",
    "SignUpInfo",
    "merchantInfo",
  ]);

  const collapseItems = useMemo(
    () => [
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
          <GroupBuy
            onChangeFormValues={onChangeFormValues}
            form={form}
            ladderList={formValues.ladderList || []}
            originalPriceShow={formValues.originalPriceShow}
          />
        ),
      },
      {
        key: "Distribution",
        label: <BlockTitle title="分销配置" />,
        children: (
          <Distribution
            onChangeFormValues={onChangeFormValues}
            form={form}
            showDistributionError={showDistributionError}
            distributionFlag={formValues.distributionFlag}
          />
        ),
      },
      {
        key: "merchantInfo",
        label: <BlockTitle title="客服/门店信息" />,
        children: (
          <MerchantInfo onChangeFormValues={onChangeFormValues} form={form} />
        ),
      },
      {
        key: "SignUpInfo",
        label: <BlockTitle title="报名表单配置" />,
        children: (
          <SignUpInfo
            onChangeFormValues={onChangeFormValues}
            signUps={formValues.signUps || []}
          />
        ),
      },
      {
        key: "SHARE_SETTINGS",
        label: <BlockTitle title="分享卡片设置" />,
        children: (
          <ShareSettings onChangeFormValues={onChangeFormValues} form={form} />
        ),
      },
    ],
    []
  );

  return (
    <Form
      form={form}
      layout="vertical"
      className={styles.configPanel}
      onValuesChange={(data) => {
        onChangeFormValues(data, false);
      }}
      initialValues={defaultCreateActivityValues}
    >
      <Collapse
        expandIconPosition="end"
        activeKey={expandKeys}
        onChange={(keys) => setExpandKeys(keys as string[])}
        items={collapseItems}
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
