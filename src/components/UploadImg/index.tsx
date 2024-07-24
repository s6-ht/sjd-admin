import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { UploadFile } from "antd";
import styles from "./index.less";
import _ from "lodash";

const supportFileFormats = ["PNG", "JPEG", "JPG"];
const fileSizeLimit = 10 * 1024 * 1024;

interface IUploadImgProps {
  limit?: number;
  uploadText?: string;
  tips?: string[];
  onValidateFileFormat?: (errorMsg: string[]) => void;
  onChange?: (file: File) => void;
}

const UploadImg = ({
  limit = 1,
  uploadText = "上传",
  tips = [],
  onValidateFileFormat,
  onChange,
}: IUploadImgProps) => {
  const [fileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const [file, setFile] = useState<File>();

  const onBeforeUpload = useCallback(
    (file: File) => {
      const fileType = getFileTypeByName(file.name);

      const errorMsg: string[] = [];

      if (file.size > fileSizeLimit) {
        errorMsg.push("图片大小不能超过10M");
      }

      if (supportFileFormats.includes(_.toUpper(fileType))) {
        errorMsg.push("只支持jpg、png、jpeg格式");
      }
      if (errorMsg?.length > 0) {
        onValidateFileFormat?.(errorMsg);
      } else {
        setFile(file);
        onChange?.(file);
      }
      return false;
    },
    [onValidateFileFormat, onChange]
  );

  return (
    <div>
      <div className={styles.uploadContainer}>
        {fileList.map((item) => (
          <div className={styles.imgItem}>
            <img width={70} height={70} src={item.url} />
            <Upload className={styles.upload} beforeUpload={onBeforeUpload}>
              <div className={styles.mask}>替换图片</div>
            </Upload>
          </div>
        ))}
        {fileList.length < limit && (
          <Upload
            className={styles.upload}
            showUploadList={false}
            beforeUpload={onBeforeUpload}
          >
            <div className={styles.addImg}>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>{uploadText}</div>
            </div>
          </Upload>
        )}
      </div>
    </div>
  );
};

export default UploadImg;

function getFileTypeByName(name: string) {
  const nameList = name?.split(".") || [];
  return nameList[nameList.length - 1];
}
