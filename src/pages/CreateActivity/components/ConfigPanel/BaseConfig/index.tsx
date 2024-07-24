import UploadImg from "@/components/UploadImg";
import {
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  FormInstance,
  Input,
} from "antd";
import { IConfigFormValues } from "..";
import ConfigItemTitle from "../components/ConfigItemTitle";
import styles from "../index.less";
import { EBooleanFlag } from "@/services/activity/types";
import { useState } from "react";
import ExpandLabel from "../components/ExpandLabel";

const { RangePicker } = DatePicker;

interface IBaseConfigProps {
  form: FormInstance<IConfigFormValues>;
  onChangeFormValues: (data: Partial<IConfigFormValues>) => void;
}

const BaseConfig = ({ form, onChangeFormValues }: IBaseConfigProps) => {
  const titleShow = Form.useWatch("titleShow", form);

  const [expand, setExpand] = useState(false);

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
      <Form.Item name="titleShow" hidden />
      <Form.Item
        label={
          <ConfigItemTitle
            title="活动标题"
            rightContent={
              <Checkbox
                checked={titleShow === EBooleanFlag.TRUE}
                onChange={(e) => {
                  const val = e.target.checked
                    ? EBooleanFlag.TRUE
                    : EBooleanFlag.FALSE;
                  form.setFieldValue("titleShow", val);
                  onChangeFormValues({ titleShow: val });
                }}
              >
                活动页显示标题
              </Checkbox>
            }
          />
        }
        name={"title"}
        required
        rules={[
          {
            required: true,
            message: "请输入活动标题",
          },
        ]}
      >
        <Input
          placeholder="请输入活动标题"
          maxLength={50}
          showCount
          required
        ></Input>
      </Form.Item>
      <Form.Item
        required
        label="活动时间"
        name={"activityTimeRange"}
        rules={[
          {
            required: true,
            message: "请选择活动时间",
          },
        ]}
      >
        <RangePicker
          showTime
          onChange={(time) => {
            console.log(time);
          }}
        />
      </Form.Item>
      <Form.Item name="backgroundColor" hidden />
      <div className={styles.customContainer}>
        <ConfigItemTitle
          title={
            <div className={styles.coverLabel}>
              页面自定义配置
              <span className={styles.tip}>背景色等</span>
            </div>
          }
          rightContent={
            <ExpandLabel
              expand={expand}
              changeExpand={() => setExpand((prev) => !prev)}
            />
          }
        />
        {expand && (
          <div className={styles.customContent}>
            <div className={styles.customItem}>
              <div className={styles.label}>背景颜色</div>
              <ColorPicker
                onChange={(color) => {
                  form.setFieldValue("backgroundColor", color);
                  onChangeFormValues({ backgroundColor: color.toRgbString() });
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default BaseConfig;
