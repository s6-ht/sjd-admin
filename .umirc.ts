import routes from "./src/router";
import path from "path";

export default {
  routes,
  npmClient: "pnpm",
  vite: process.env.VITE_ENV === "vite" && {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
};
