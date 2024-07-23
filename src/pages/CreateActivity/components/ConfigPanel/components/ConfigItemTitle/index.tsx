import styles from "./index.less";
import { ReactNode } from "react";

interface IConfigItemTitleProps {
  title: string;
  rightContent?: ReactNode;
}

const ConfigItemTitle = ({ title, rightContent }: IConfigItemTitleProps) => {
  return (
    <div className={styles.titleContainer}>
      <span className={styles.title}>{title}</span>
      {rightContent}
    </div>
  );
};
export default ConfigItemTitle;
