import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import styles from "./index.less";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IUploadImgProps {
  limit?: number;
  uploadText?: string;
}

const UploadImg = ({ limit = 1, uploadText = "上传" }: IUploadImgProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <div className={styles.uploadContainer}>
      {fileList.map((item) => (
        <div className={styles.imgItem}>
          <img width={100} height={100} src={item.url} />
          <Upload className={styles.upload} onChange={handleChange}>
            <div className={styles.mask}>替换图片</div>
          </Upload>
        </div>
      ))}
      {fileList.length < limit && (
        <Upload className={styles.upload} onChange={handleChange}>
          <div className={styles.addImg}>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>{uploadText}</div>
          </div>
        </Upload>
      )}
    </div>
  );
};

export default UploadImg;
