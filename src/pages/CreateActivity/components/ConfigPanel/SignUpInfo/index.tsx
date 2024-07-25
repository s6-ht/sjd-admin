import { Button } from "antd";
import { useState } from "react";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { IConfigFormValues } from "@/pages/CreateActivity/types";
import styles from "../index.less";
import { EContentType, ISignUpInfo } from "@/services/activity/types";
import classNames from "classnames";
import AddSignUpModal from "./AddSignUpModal";

interface IBaseConfigProps {
  onChangeFormValues: (
    data: Partial<IConfigFormValues>,
    needUpdateForm?: boolean
  ) => void;
  signUps: ISignUpInfo[];
}

const SignUpInfo = ({ onChangeFormValues, signUps }: IBaseConfigProps) => {
  const getContentTags = (contentInfo: ISignUpInfo) => {
    const tags: string[] = [];

    if (contentInfo.isNotNull) {
      tags.push("必填");
    }
    if (contentTypeMap[contentInfo.contentTypeName]) {
      tags.push(contentTypeMap[contentInfo.contentTypeName]);
    }
    return tags;
  };

  const [addSignUpModalInfo, setAddSignUpModalInfo] = useState<{
    open: boolean;
    record?: ISignUpInfo;
  }>({
    open: false,
  });

  return (
    <>
      {signUps.map((item, index) => {
        const tags = getContentTags(item);
        return (
          <div
            key={item.id}
            className={classNames(styles.signUpItem, {
              [styles.disabled]: item.disabled,
            })}
            onClick={() => {
              if (item.disabled) return;
              setAddSignUpModalInfo({ open: true, record: item });
            }}
          >
            <span>{item.content}</span>
            <span>{tags.join(" / ")}</span>
            {index > 1 && <CloseCircleOutlined className={styles.closeIcon} />}
          </div>
        );
      })}
      <Button
        style={{ marginTop: 4 }}
        type="dashed"
        onClick={() => {
          setAddSignUpModalInfo({ open: true });
        }}
        icon={<PlusOutlined />}
        block
      >
        添加信息项
      </Button>
      {addSignUpModalInfo.open && (
        <AddSignUpModal
          isEdit={!!addSignUpModalInfo.record}
          data={addSignUpModalInfo.record}
          onClose={() => setAddSignUpModalInfo({ open: false })}
          updateData={(data) => {
            let newSignUps = signUps;

            if (signUps.find((item) => item.id == data.id)) {
              newSignUps = signUps.map((item) =>
                item.id === data.id ? data : item
              );
            } else {
              newSignUps = [...signUps, data];
            }
            onChangeFormValues({ signUps: newSignUps }, false);
          }}
        />
      )}
    </>
  );
};
export default SignUpInfo;

export const contentTypeMap = {
  [EContentType.INPUT]: "文本",
  [EContentType.RADIO]: "单选",
  [EContentType.MULTIPLE]: "多选",
};
