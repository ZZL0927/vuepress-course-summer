module.exports = {
    theme:'@zilongzhang/vuepress-theme-dargon',
    themeConfig:{
        nav: [
            { text: "课程", link: "/lessons/01" },
            { text: "笔记", link: "/notes/" },
        ],
        sidebar:{
            "/lessons/": [
                {
                  title: "目录",
                  collapsable: false,
                  sidebarDepth: 0,
                  children: [
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                  ],
                },
              ],
        }
    }
  };