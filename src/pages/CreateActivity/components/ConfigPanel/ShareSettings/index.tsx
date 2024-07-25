import UploadImg from "@/components/UploadImg";
import { Button, Form, FormInstance, Input } from "antd";
import ConfigItemTitle from "../components/ConfigItemTitle";
import styles from "../index.less";
import { IConfigFormValues } from "@/pages/CreateActivity/types";

interface IBaseConfigProps {
  form: FormInstance<IConfigFormValues>;
  onChangeFormValues: (
    data: Partial<IConfigFormValues>,
    needUpdateForm?: boolean
  ) => void;
}

const ShareSettings = ({ form, onChangeFormValues }: IBaseConfigProps) => {
  return (
    <>
      <Form.Item
        label={
          <ConfigItemTitle
            title="分享卡片文案"
            rightContent={
              <Button
                style={{ fontSize: 12 }}
                className={styles.formItemRight}
                type="link"
                size="small"
              >
                卡片示例
              </Button>
            }
          />
        }
        name={"shareCardContent"}
      >
        <Input
          placeholder="请输入分享卡片文案"
          maxLength={50}
          showCount
        ></Input>
      </Form.Item>
      <div className={styles.uploadContainer}>
        <div className={styles.flexColumnStart}>
          <span>分享卡片封面</span>
          <div className={styles.tip}>
            支持jpg、png、jpeg格式，且图片限制在10M以内。
          </div>
        </div>
        <UploadImg
          uploadText="上传封面"
          onValidateFileFormat={(msg) => {
            form.setFields([
              {
                name: "shareCardCoverFile",
                errors: msg,
              },
            ]);
          }}
          onChange={(file) => {
            onChangeFormValues({ shareCardCoverFile: file }, false);
          }}
        />
      </div>
    </>
  );
};
export default ShareSettings;
