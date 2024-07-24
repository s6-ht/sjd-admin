import { DownOutlined, RightOutlined } from "@ant-design/icons";
import styles from "./index.less";
import { useState } from "react";

interface IExpandLabelProps {
  expandText?: string;
  foldText?: string;
  expand: boolean;
  changeExpand: () => void;
}

const ExpandLabel = ({
  expandText = "展开",
  foldText = "收起",
  expand,
  changeExpand,
}: IExpandLabelProps) => {
  return (
    <div className={styles.expandLabel} onClick={changeExpand}>
      <span className={styles.title}>{expand ? foldText : expandText}</span>
      {expand ? <RightOutlined /> : <DownOutlined />}
    </div>
  );
};
export default ExpandLabel;
