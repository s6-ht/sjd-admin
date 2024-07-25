import CountDown from "@/components/CountDown";
import styles from "../index.less";
import { useMemo } from "react";
import { EBooleanFlag } from "@/services/activity/types";
import { IConfigFormValues } from "@/pages/CreateActivity/types";

interface IBaseConfigPreviewProps {
  formValues: IConfigFormValues;
}

const BaseConfigPreview = ({ formValues }: IBaseConfigPreviewProps) => {
  const timeRange = useMemo(() => {
    const [startTime, endTime] = formValues.activityTimeRange || [];
    return {
      startTime: startTime.isValid() ? startTime.valueOf() : 0,
      endTime: endTime.isValid() ? endTime.valueOf() : 0,
    };
  }, [formValues.activityTimeRange]);

  return (
    <>
      {/* 封面图 */}
      {formValues.titleShow === EBooleanFlag.TRUE && (
        <div
          className={styles.titleContainer}
          style={{ color: formValues.themeColor }}
        >
          {formValues.title}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <CountDown
          startTime={timeRange.startTime}
          endTime={timeRange.endTime}
          themeColor={formValues.themeColor}
        />
      </div>
    </>
  );
};
export default BaseConfigPreview;
