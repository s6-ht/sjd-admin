import styles from "./index.less";
import { ReactNode } from "react";

interface IBlockTitleProps {
  title: string;
  rightContent?: ReactNode;
}

const BlockTitle = ({ title, rightContent }: IBlockTitleProps) => {
  return (
    <div className={styles.titleContainer}>
      <span className={styles.title}>{title}</span>
      {rightContent}
    </div>
  );
};
export default BlockTitle;
