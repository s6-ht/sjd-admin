import classNames from "classnames";
import { INavigationProps } from "../../primaryNav";
import styles from "./index.less";
import { history, useLocation } from "umi";

export default function Navigation({ nav }: INavigationProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className={styles.navigation}>
      <div className={styles.primaryMenu}>
        <div className={styles.logo}>Logo</div>
        {nav.map((item) => {
          const { path, children = [], keepActive } = item;
          const isActive =
            (pathname === path && children.length === 0) ||
            keepActive?.some((item) => pathname.includes(item));

          return (
            <div
              className={classNames(styles.menuItem, {
                [styles.active]: isActive,
              })}
              key={item.path}
              onClick={() => {
                if (children.length) {
                  history.push(children[0].path);
                  return;
                }
                history.push(item.path);
              }}
            >
              {item.icon?.({})}
              <span className={styles.menuName}>{item.name}</span>
            </div>
          );
        })}
      </div>
      {/* <div className={styles.navContent}>
        <div>
          {nav.map((item, index) => {
            return <NavItem key={index} {...item}></NavItem>;
          })}
        </div>
      </div> */}
    </div>
  );
}
