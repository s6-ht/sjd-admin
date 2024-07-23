import { IActivityTemplateInfo } from "@/services/activity/types";
import styles from "./index.less";
import { Tooltip } from "antd";

const TemplateCard = ({
  data,
  onItemClick,
}: {
  data: IActivityTemplateInfo;
  onItemClick?: () => void;
}) => {
  return (
    <div className={styles.templateCard} onClick={onItemClick}>
      <div
        className={styles.cover}
        style={{ backgroundImage: `url(${data.coverUrl})` }}
      ></div>
      <Tooltip title={data.name}>
        <div className={styles.title}>{data.name}</div>
      </Tooltip>
      <div className={styles.desc} title={data.remark}>
        {data.remark}
      </div>
      <div className={styles.tags}>
        <div className={styles.tag}>拼团</div>
      </div>
    </div>
  );
};
export default TemplateCard;
