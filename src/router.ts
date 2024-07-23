export default [
  {
    path: "/",
    routes: [
      {
        path: "/",
        redirect: "/templateManage",
      },
      { path: "/login", exact: true, component: "@/pages/Login" },
      {
        path: "/templateManage",
        exact: true,
        component: "@/pages/TemplateManage",
      },
      {
        path: "/createActivity",
        exact: true,
        component: "@/pages/CreateActivity",
      },
      {
        path: "/activity/list",
        exact: true,
        component: "@/pages/Activity/List",
      },
    ],
  },
];
