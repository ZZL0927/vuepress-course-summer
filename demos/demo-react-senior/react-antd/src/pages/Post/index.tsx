import * as React from "react";
import { RouteChildrenProps } from "react-router-dom";
import { Table, Button, message } from "antd";
import { ColumnProps } from "antd/lib/table";

import { IArticle } from "../../types";
import * as api from "../../services/api";

interface State {
  rows: IArticle[];
}

export default class User extends React.Component<RouteChildrenProps, State> {
  columns: ColumnProps<IArticle>[] = [
    {
      title: "配图",
      dataIndex: "banner",
      width: 160,
      render: (value: string) => <img src={value} width="120" alt="" />,
    },
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "作者",
      dataIndex: "author",
      width: 150,
    },
    {
      title: "时间",
      dataIndex: "time",
      width: 200,
    },
    {
      title: "点赞",
      dataIndex: "likes",
      width: 100,
    },
    {
      title: "评论",
      dataIndex: "comments",
      width: 100,
    },
    {
      title: "操作",
      key: "opt",
      width: 150,
      align: "center",
      render: (value, record) => {
        return (
          <Button size="small" onClick={() => message.warning(record.title)}>
            查看
          </Button>
        );
      },
    },
  ];

  state: State = {
    rows: [],
  };

  async getData() {
    let handle = message.loading("正在加载数据...", 0);
    let result = await api.posts();
    if (result.stat === "OK") {
      this.setState({
        rows: result.rows,
      });
    }
    handle();
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <Table dataSource={this.state.rows} rowKey="id" columns={this.columns} />
    );
  }
}
