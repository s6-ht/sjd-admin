import { AppstoreOutlined, BankOutlined } from "@ant-design/icons";

export const sidebarNav: ISidebarNavItem[] = [
  {
    icon: (props) => <BankOutlined {...props} />,
    name: "活动模版",
    path: "/templateManage",
    keepActive: ["/templateManage", "/createActivity"],
    children: [
      {
        name: "创建活动",
        path: "/createActivity",
        keepActive: [],
      },
    ],
    show: true,
  },
  {
    icon: (props) => <AppstoreOutlined {...props} />,
    name: "活动管理",
    path: "/activity/list",
    keepActive: [],
    show: true,
  },
];

const navConfig: INavigationProps = {
  nav: sidebarNav,
};

export default navConfig;

export interface ISidebarNavItem {
  icon?: (props: { [key: string]: string | number }) => JSX.Element;
  name: string;
  path: string;
  keepActive?: string[];
  /** 是否显示 */
  show?: boolean;
  children?: ISidebarNavItem[];
}

export interface IBelowHandler {
  icon?: React.ReactNode;
  name: string;
  onClick?: () => void;
}

export interface INavigationProps {
  nav: ISidebarNavItem[];
}

export function hasPath(nav: ISidebarNavItem[], currentPath: string): boolean {
  return nav.some((navItem) => {
    if (navItem.children?.length) {
      return hasPath(navItem.children, currentPath);
    }
    return (
      navItem.path === currentPath ||
      navItem.keepActive?.some((path) => currentPath.includes(path))
    );
  });
}
