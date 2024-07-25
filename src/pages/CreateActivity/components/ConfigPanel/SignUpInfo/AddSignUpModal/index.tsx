import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Switch,
} from "antd";
import { EContentType, ISignUpInfo } from "@/services/activity/types";
import { contentTypeMap } from "..";
import styles from "./index.less";
import { genId } from "@/common/utils/genId";
import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { useDebounceFn } from "ahooks";

const OPTION_LIMIT = 10;

const AddSignUpModal = (props: {
  isEdit?: boolean;
  onClose: () => void;
  data?: ISignUpInfo;
  updateData?: (data: ISignUpInfo) => void;
}) => {
  const { isEdit = false, onClose, data, updateData } = props;
  const [form] = Form.useForm();
  const contentTypeName = Form.useWatch("contentTypeName", form);

  const [options, setOptions] = useState<{ id: string; content: string }[]>(
    isEdit
      ? (data?.options || []).map((item) => ({ id: genId(), content: item }))
      : [{ id: genId(), content: "选项一" }]
  );

  const changeOptionInfo = (id: string, val: string) => {
    setOptions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, content: val! } : item))
    );
  };

  const { run: changeOptionInfoDebounce } = useDebounceFn(
    (id: string, val?: string) => {
      changeOptionInfo(id, val!);
    },
    {
      wait: 300,
    }
  );

  return (
    <Modal
      title={isEdit ? "添加信息项" : "编辑信息项"}
      open={true}
      onCancel={() => onClose()}
      onOk={() => {
        form.validateFields().then((values: ISignUpInfo) => {
          onClose();
          updateData?.({
            ...data,
            ...values,
            maxSelect: values.maxSelect ?? 1,
            options: options.map((item) => item.content),
          });
        });
      }}
    >
      <Form
        labelCol={{ span: 4 }}
        form={form}
        colon={false}
        className={styles.addSignUp}
        initialValues={{
          contentTypeName: EContentType.INPUT,
          maxSelect: 1,
          isNotNull: false,
          content: "",
          ...data,
        }}
      >
        <Form.Item name="contentTypeName" label="信息项类型">
          <Radio.Group>
            {Object.values(EContentType).map((item) => (
              <Radio key={item} value={item}>
                {contentTypeMap[item]}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item name="isNotNull" label="必填">
          <Switch />
        </Form.Item>
        {contentTypeName === EContentType.MULTIPLE && (
          <Form.Item name="maxSelect" label="最多勾选">
            <InputNumber addonAfter="项" min={1} max={options.length} />
          </Form.Item>
        )}
        <Form.Item
          name="content"
          label="信息内容"
          required
          rules={[{ required: true, message: "请输入信息内容" }]}
        >
          <Input placeholder="请输入信息内容" />
        </Form.Item>
        {[EContentType.MULTIPLE, EContentType.RADIO].includes(
          contentTypeName
        ) && (
          <>
            <Col className={styles.options} offset={4}>
              {options.map((option) => (
                <div className={styles.optionItem}>
                  <Input
                    defaultValue={option.content}
                    onChange={(e) => {
                      changeOptionInfoDebounce(option.id, e.target.value);
                    }}
                    placeholder="选项"
                    onBlur={() => {
                      if (!option.content?.trim()) {
                        changeOptionInfo(option.id, "选项");
                      }
                    }}
                  />
                  {options.length > 1 && (
                    <CloseCircleFilled
                      className={styles.closeIcon}
                      onClick={() => {
                        setOptions((prev) =>
                          prev.filter((item) => item.id !== option.id)
                        );
                      }}
                    />
                  )}
                </div>
              ))}
            </Col>
            {options.length <= OPTION_LIMIT && (
              <Col offset={4}>
                <Button
                  type="dashed"
                  onClick={() => {
                    setOptions((prev) => [
                      ...prev,
                      { id: genId(), content: `选项` },
                    ]);
                  }}
                  icon={<PlusOutlined />}
                  block
                  style={{ marginTop: 16 }}
                >
                  添加选项
                </Button>
              </Col>
            )}
          </>
        )}
      </Form>
    </Modal>
  );
};

export default AddSignUpModal;
