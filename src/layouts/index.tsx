import { Outlet, useLocation } from "umi";
import styles from "./index.less";
import "../styles/globals.css";
import { useMemo } from "react";
import primaryNav, { ISidebarNavItem, hasPath } from "./primaryNav";
import SideBar from "./components/SideBar";
import { Breadcrumb } from "antd";

export default function Layout() {
  const location = useLocation();
  const pathname = location.pathname;

  const sideBar = useMemo(() => {
    if (hasPath(primaryNav.nav, pathname)) {
      return <SideBar {...primaryNav} />;
    }
    return null;
  }, [pathname]);

  const activeMenuList = useMemo(() => {
    let list: IBreadcrumbItem[] = [];

    const search = (data: ISidebarNavItem[], path: IBreadcrumbItem[] = []) => {
      if (!data?.length) return;

      for (let i = 0; i < data.length; i++) {
        const menuItem = data[i];
        const menuInfo = { title: menuItem.name, path: menuItem.path };
        if (menuItem.path === location.pathname) {
          list = [...path, { title: menuItem.name }];
          break;
        } else {
          search(menuItem.children || [], [...path, menuInfo]);
        }
      }
    };

    search(primaryNav.nav, []);
    return list;
  }, [location.pathname]);

  return (
    <div className={styles.layout}>
      {sideBar}
      <div className={styles.content}>
        <div className={styles.header}>
          <Breadcrumb items={activeMenuList} />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

interface IBreadcrumbItem {
  path?: string;
  title: string;
}
