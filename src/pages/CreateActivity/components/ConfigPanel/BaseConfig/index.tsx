import UploadImg from "@/components/UploadImg";
import { Form, Input } from "antd";

const BaseConfig = () => {
  return (
    <>
      <Form.Item name="cover" label="活动封面">
        <UploadImg uploadText="上传封面" />
      </Form.Item>
      <Form.Item
        label="活动标题"
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
