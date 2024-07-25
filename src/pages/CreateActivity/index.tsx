import { useSetState } from "ahooks";
import ConfigPanel from "./components/ConfigPanel";
import PreviewPanel from "./components/PreviewPanel";
import styles from "./index.less";
import { useCallback, useState } from "react";
import { defaultCreateActivityValues } from "./constant";
import { IConfigFormValues } from "./types";
import { Form } from "antd";
import { EBooleanFlag } from "@/services/activity/types";
import { validateDistributionPrice } from "./helper";

const CreateActivity = () => {
  const [formValues, setFormValues] = useSetState<IConfigFormValues>(
    defaultCreateActivityValues
  );
  const [form] = Form.useForm<IConfigFormValues>();
  const [showDistributionError, setShowDistributionError] = useState(false);

  const onChangeFormValues = useCallback(
    (data: Partial<IConfigFormValues>, needUpdateForm = true) => {
      if (needUpdateForm) {
        form.setFieldsValue(data);
      }
      setFormValues({ ...data });
    },
    []
  );

  const [published, setPublishSuccess] = useState(false);
  const onPublish = () => {
    const { payPrice, distributionTotalPrice } = formValues;

    const validateList: any = [form.validateFields()];
    if (formValues.distributionFlag === EBooleanFlag.TRUE) {
      validateList.push(
        validateDistributionPrice(
          payPrice,
          distributionTotalPrice,
          setShowDistributionError
        )
      );
    }

    Promise.all(validateList).then((data) => {
      console.log(data[0]);
    });
  };

  return (
    <div className={styles.createActivity}>
      <div className={styles.previewContainer}>
        <PreviewPanel formValues={formValues} />
      </div>
      <div className={styles.configArea}>
        <ConfigPanel
          form={form}
          formValues={formValues}
          onChangeFormValues={onChangeFormValues}
          showDistributionError={showDistributionError}
          onPublish={onPublish}
        />
      </div>
      {/* 发布成功弹窗 */}
    </div>
  );
};

export default CreateActivity;
