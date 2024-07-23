import ConfigNav from "./components/ConfigNav";
import ConfigPanel from "./components/ConfigPanel";
import PreviewPanel from "./components/PreviewPanel";
import styles from "./index.less";

const CreateActivity = () => {
  return (
    <div className={styles.createActivity}>
      <div className={styles.previewContainer}>
        <PreviewPanel />
      </div>
      <div className={styles.configArea}>
        <ConfigNav />
        <ConfigPanel />
      </div>
    </div>
  );
};

export default CreateActivity;

const templateConfig = {
  configList: [
    {
      type: "BASE_CONFIG",
      title: "基础配置",
    },
    {
      type: "GROUP_BUY",
      title: "拼团商品配置",
    },
    {
      type: "BARGAIN",
      title: "砍价商品配置",
    },
    {
      type: "DISTRIBUTION",
      title: "分销配置",
    },
    {
      type: "",
      title: "活动/机构介绍",
    },
    {
      type: "",
      title: "门店/客服信息",
    },
    {
      type: "",
      title: "报名信息收集",
    },
    {
      type: "",
      title: "分享设置",
    },
  ],
  baseConfig: {},
  groupBuy: {},
  bargain: {},
  shareSettings: {},
  userRegistrationInfo: {},
  organizationConfig: {},
  customerServiceInfo: {},
  lotteryConfig: {},
  distributionConfig: {},
};
