import { IConfigFormValues } from "../../types";
import BaseConfigPreview from "./BaseConfig";
import styles from "./index.less";

interface IPreviewPanelProps {
  formValues: IConfigFormValues;
}

const PreviewPanel = ({ formValues }: IPreviewPanelProps) => {
  return (
    <div
      className={styles.previewPanel}
      style={{ backgroundColor: formValues.backgroundColor }}
    >
      <BaseConfigPreview formValues={formValues} />
    </div>
  );
};
export default PreviewPanel;
