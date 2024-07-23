import _ from "lodash";
import getResponse from "./common";

export default {
  "GET /web/activity/template/list": (req, res) => {
    const exportTaskList = _.range(3).map((item, index) => {
      return {
        name: `name-${index}`,
        description: `描述描述描述描述描述描述描述-${index}`,
        types: _.sample(["GROUP_BUYING", "BARGAINING", "DISTRIBUTION"]),
        cover:
          "https://cdn.pixabay.com/photo/2024/06/14/21/19/summer-8830636_1280.jpg",
      };
    });
    res.end(
      JSON.stringify(
        getResponse({
          pageIndex: 0,
          pageSize: 0,
          totalPage: 0,
          total: 0,
          list: _.range(10).map((item) => {
            return {
              id: item,
              coverUrl:
                "https://cdn.pixabay.com/photo/2024/06/14/21/19/summer-8830636_1280.jpg",
              name: `name-${item}`,
              tags: ["拼团", "砍价", "分销"],
              remark: `remarkremarkremarkremarkremarkremark-${item}`,
              url: "https://cdn.pixabay.com/photo/2024/06/14/21/19/summer-8830636_1280.jpg",
            };
          }),
        })
      )
    );
  },
};
