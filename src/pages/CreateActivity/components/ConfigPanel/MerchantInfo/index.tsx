import { Form, FormInstance, Input } from "antd";
import { useCallback } from "react";
import { IConfigFormValues } from "@/pages/CreateActivity/types";

interface IBaseConfigProps {
  form: FormInstance<IConfigFormValues>;
  onChangeFormValues: (data: Partial<IConfigFormValues>) => void;
}

const MerchantInfo = ({ form, onChangeFormValues }: IBaseConfigProps) => {
  return (
    <>
      <Form.Item label="门店名称" required>
        <Input placeholder="请输入门店名称" showCount maxLength={30} />
      </Form.Item>
      <Form.Item label="门店地址"></Form.Item>
      <Form.Item
        label="联系电话"
        required
        rules={[
          {
            required: true,
            message: "请输入联系电话",
          },
        ]}
      >
        <Input placeholder="请输入联系电话" />
      </Form.Item>
      {/* <Button
        style={{ marginTop: 4 }}
        type="dashed"
        onClick={() => {}}
        icon={<PlusOutlined />}
        block
      >
        添加联系电话
      </Button> */}
    </>
  );
};
export default MerchantInfo;
