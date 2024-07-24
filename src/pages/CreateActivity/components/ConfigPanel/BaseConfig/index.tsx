import UploadImg from "@/components/UploadImg";
import { Form, FormInstance, Input } from "antd";
import { IConfigFormValues } from "..";
import ConfigItemTitle from "../components/ConfigItemTitle";
import styles from "../index.less";

interface IBaseConfigProps {
  form: FormInstance<IConfigFormValues>;
}

const BaseConfig = ({ form }: IBaseConfigProps) => {
  return (
    <>
      <Form.Item
        name="cover"
        label={
          <div className={styles.coverLabel}>
            <span>活动封面</span>
            <span className={styles.tip}>
              推荐尺寸为750*500px，图片过长/过大会影响清晰度
            </span>
          </div>
        }
      >
        <UploadImg
          uploadText="上传封面"
          onValidateFileFormat={(msg) => {
            form.setFields([
              {
                name: "cover",
                errors: msg,
              },
            ]);
          }}
        />
      </Form.Item>
      <Form.Item
        label={<ConfigItemTitle title="活动标题" />}
        name={"title"}
        required
        rules={[
          {
            required: true,
            message: "请输入活动标题",
          },
        ]}
      >
        <Input.TextArea
          placeholder="请输入活动标题"
          maxLength={50}
          showCount
          required
        ></Input.TextArea>
      </Form.Item>
    </>
  );
};
export default BaseConfig;
