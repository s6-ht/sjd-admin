import { IActivityTemplateInfo } from "@/services/activity/types";
import { Button, Modal, Tag } from "antd";
import styles from "./index.less";
import { history } from "umi";

interface ITemplateDetailModalProps {
  data: IActivityTemplateInfo;
  onClose: () => void;
}

const TemplateDetailModal = ({ onClose, data }: ITemplateDetailModalProps) => {
  return (
    <Modal
      open={true}
      title={null}
      footer={null}
      onCancel={onClose}
      centered
      className={styles.templateDetailModal}
      width={976}
    >
      <div className={styles.detailInfo}>
        <div
          className={styles.cover}
          style={{ backgroundImage: `url(${data.coverUrl})` }}
        ></div>
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.title}>{data.name}</div>
            <div className={styles.desc}>{data.remark}</div>
            <div className={styles.tags}>
              {(data.tags || []).map((item) => (
                <Tag color="error">{item}</Tag>
              ))}
            </div>
          </div>
          <Button
            type="primary"
            onClick={() => {
              history.push({
                pathname: "/createActivity",
                search: `templateId=${data.id}`,
              });
            }}
          >
            立即创建
          </Button>
        </div>
      </div>
      <div className={styles.preview}>
        <div
          className={styles.previewImg}
          style={{
            backgroundImage: `url("https://cdn.s.shangjiadao.cn/user/fd310443e5fd7daf38eb25aa101beb74.png?x-oss-process=image/resize,w_720")`,
          }}
        ></div>
        <div
          className={styles.previewImg}
          style={{
            backgroundImage: `url("https://cdn.s.shangjiadao.cn/user/fd310443e5fd7daf38eb25aa101beb74.png?x-oss-process=image/resize,w_720")`,
          }}
        ></div>
        <div
          className={styles.previewImg}
          style={{
            backgroundImage: `url("https://cdn.s.shangjiadao.cn/user/fd310443e5fd7daf38eb25aa101beb74.png?x-oss-process=image/resize,w_720")`,
          }}
        ></div>
        <div
          className={styles.previewImg}
          style={{
            backgroundImage: `url("https://cdn.s.shangjiadao.cn/user/fd310443e5fd7daf38eb25aa101beb74.png?x-oss-process=image/resize,w_720")`,
          }}
        ></div>
      </div>
    </Modal>
  );
};
export default TemplateDetailModal;
