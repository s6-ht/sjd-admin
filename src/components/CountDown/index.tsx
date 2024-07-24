import { useMemo } from "react";
import styles from "./index.less";
import useCountdown from "./useCountDown";

interface IProps {
  startTime: number;
  endTime: number;
  themeColor: string;
  bcgColor?: string;
  textColor?: string;
}

const CountDown = ({
  startTime,
  endTime,
  themeColor,
  bcgColor,
  textColor,
}: IProps) => {
  const isNotStart = useMemo(
    () => startTime > new Date().getTime(),
    [startTime]
  );
  const isEnd = useMemo(() => new Date().getTime() > endTime, [endTime]);

  const title = useMemo(() => {
    if (isNotStart) {
      return "距离活动开始还剩";
    }
    if (isEnd) {
      return "活动已结束";
    }
    return "距离活动结束还剩";
  }, [isEnd, isNotStart]);

  const countdownInfo = useCountdown({
    deadlineTime: isNotStart ? startTime : endTime,
  });
  const renderedCountdownInfo = isEnd
    ? {
        day: "00",
        hoursStr: "00",
        minutesStr: "00",
        secondsStr: "00",
      }
    : countdownInfo;

  const getCountdownItem = (time: string | number) => {
    return (
      <div
        className={styles.box}
        style={{
          backgroundColor: bcgColor,
          color: textColor,
        }}
      >
        {time}
      </div>
    );
  };

  return (
    <div className={styles.countdown}>
      <div style={{ color: themeColor }}>—— {title} ——</div>
      <div className={styles.countdownBox}>
        <div
          className={styles.dayBox}
          style={{
            backgroundColor: bcgColor,
            color: textColor,
          }}
        >
          {renderedCountdownInfo.day}
        </div>
        <span>天</span>
        {getCountdownItem(renderedCountdownInfo.hoursStr)}
        <span>:</span>
        {getCountdownItem(renderedCountdownInfo.minutesStr)}
        <span>:</span>
        {getCountdownItem(renderedCountdownInfo.secondsStr)}
      </div>
    </div>
  );
};
export default CountDown;
