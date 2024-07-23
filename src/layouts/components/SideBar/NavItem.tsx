import classNames from "classnames";
import { useMemo } from "react";
import { history } from "umi";
import styles from "./index.less";
import { ISidebarNavItem, hasPath } from "../../primaryNav";

export default function NavItem(props: ISidebarNavItem) {
  const pathname = history.location.pathname;
  const { children = [], icon: NavIcon, name, path, keepActive } = props;

  const isActive =
    (pathname === path && children.length === 0) ||
    keepActive?.some((item) => pathname.includes(item));

  const open = useMemo(() => {
    return hasPath(children, pathname);
  }, [children, pathname]);

  return (
    <div
      className={classNames(styles.navItemWrap, {
        [styles.navItemExpand]: open,
      })}
    >
      <div className={styles.navItem} onClick={() => history.push(path)}>
        <div
          className={classNames(styles.nav, {
            [styles.active]: isActive,
          })}
        >
          {NavIcon && (
            <NavIcon
              size={16}
              color={"#fff"}
              fill-opacity={isActive ? 1 : 0.55}
            />
          )}
          <span className={styles.name}>{name}</span>
          {/* {children.length === 0 ? null : open ? (
            <ArrowUpLightLine />
          ) : (
            <ArrowDownLightLine />
          )} */}
        </div>
      </div>
      {children.map((item, index) => {
        return (
          <div
            className={styles.navChildItem}
            key={index}
            onClick={() => {
              history.push(item.path);
            }}
          >
            <div
              className={classNames(styles.nav, {
                [styles.active]:
                  pathname === item.path ||
                  item.keepActive?.some(
                    (keepPath) =>
                      pathname.includes(keepPath) &&
                      pathname.split(item.path)[1]?.startsWith("/")
                  ),
              })}
            >
              {item.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
