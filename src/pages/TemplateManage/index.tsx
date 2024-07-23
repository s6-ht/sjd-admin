import { Input, Tag } from "antd";
import styles from "./index.less";
import {
  ETemplateType,
  IActivityTemplateInfo,
  IGetTemplateListReq,
} from "@/services/activity/types";
import { useDebounceFn, useRequest, useSetState } from "ahooks";
import { getActivityTemplateList } from "@/services/activity";
import { SearchOutlined } from "@ant-design/icons";
import TemplateCard from "./TemplateCard";
import { useState } from "react";
import TemplateDetailModal from "./components/TemplateDetailModal";

const TemplateManage = () => {
  const [filters, setFilters] = useSetState<IFilters>({
    current: 1,
    size: 20,
    name: "",
    selectTypes: [],
    selectAllType: true,
  });

  const { data: templateRes, run: getList } = useRequest(
    () => {
      return getActivityTemplateList({
        current: filters.current,
        size: filters.size,
        name: filters.name,
        type: filters.selectAllType ? undefined : filters.selectTypes.join(","),
      });
    },
    {
      refreshDeps: [filters],
    }
  );

  const { run: onSearch } = useDebounceFn((fn) => fn(), { wait: 500 });

  const [detailModalInfo, stDetailModalInfo] =
    useState<IActivityTemplateInfo>();

  return (
    <div className={styles.templateManage}>
      <div className={styles.filters}>
        <div className={styles.types}>
          <span className={styles.label}>模版类型</span>
          <div>
            <Tag.CheckableTag
              checked={filters.selectAllType}
              onChange={(checked) => {
                setFilters({ selectAllType: checked });
              }}
            >
              全部
            </Tag.CheckableTag>
            {templateTypes.map((item) => (
              <Tag.CheckableTag
                key={item.key}
                checked={filters.selectTypes?.includes(item.key)}
                onChange={(checked) => {
                  console.log(checked, "checked");
                  setFilters({
                    selectTypes: checked
                      ? [...filters.selectTypes, item.key]
                      : filters?.selectTypes?.filter((key) => key !== item.key),
                  });
                }}
              >
                {item.name}
              </Tag.CheckableTag>
            ))}
          </div>
        </div>
        <Input
          placeholder="请输入模版名称"
          style={{ width: 240 }}
          onChange={(e) => {
            onSearch(setFilters({ name: e.target.value?.trim() }));
          }}
          onPressEnter={() => getList()}
          suffix={
            <SearchOutlined
              onClick={() => getList()}
              style={{ color: "#6B7280" }}
            />
          }
        />
      </div>
      <div className={styles.list}>
        {(templateRes?.list || []).map((item) => (
          <TemplateCard
            key={item.id}
            data={item}
            onItemClick={() => stDetailModalInfo(item)}
          />
        ))}
      </div>
      {detailModalInfo && (
        <TemplateDetailModal
          data={detailModalInfo}
          onClose={() => stDetailModalInfo(undefined)}
        />
      )}
    </div>
  );
};
export default TemplateManage;

const templateTypes = [
  {
    name: "拼团",
    key: ETemplateType.GROUP_BUY,
  },
  {
    name: "分销",
    key: ETemplateType.DISTRIBUTION,
  },
  {
    name: "砍价",
    key: ETemplateType.BARGAIN,
  },
];

interface IFilters extends Omit<IGetTemplateListReq, "type"> {
  selectTypes: ETemplateType[];
  selectAllType: boolean;
}
