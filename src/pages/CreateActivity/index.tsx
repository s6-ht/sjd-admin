import { useSetState } from "ahooks";
import ConfigNav from "./components/ConfigNav";
import ConfigPanel, { IConfigFormValues } from "./components/ConfigPanel";
import PreviewPanel from "./components/PreviewPanel";
import styles from "./index.less";
import { useCallback, useState } from "react";
import { defaultCreateActivityValues } from "./constant";

const CreateActivity = () => {
  const [formValues, setFormValues] = useSetState<IConfigFormValues>(
    defaultCreateActivityValues
  );

  const onChangeFormValues = useCallback((data: Partial<IConfigFormValues>) => {
    setFormValues({ ...data });
  }, []);

  return (
    <div className={styles.createActivity}>
      <div className={styles.previewContainer}>
        <PreviewPanel formValues={formValues} />
      </div>
      <div className={styles.configArea}>
        <ConfigNav />
        <ConfigPanel onChangeFormValues={onChangeFormValues} />
      </div>
    </div>
  );
};

export default CreateActivity;
