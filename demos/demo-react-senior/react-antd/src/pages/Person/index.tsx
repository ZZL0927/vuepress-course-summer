import * as React from "react";
import { RouteChildrenProps } from "react-router-dom";
import {
  Table,
  Form,
  Button,
  Input,
  Menu,
  Dropdown,
  Modal,
  Tag,
  message,
} from "antd";
import { SettingOutlined, PlusOutlined } from "@ant-design/icons";
import { ColumnProps } from "antd/lib/table";

import style from "./style.module.scss";
import Edit from "./Edit";
import { IPerson, Gender } from "../../types";
import * as api from "../../services/api";

interface State {
  visible: boolean;
  keyword: string;
  users: IPerson[];
  current: IPerson;
}

export default class Person extends React.Component<RouteChildrenProps, State> {
  columns: ColumnProps<IPerson>[] = [
    {
      title: "头像",
      dataIndex: "avatar",
      width: 150,
      align: "center",
      render: (value) => <img src={value} width="120" alt="" />,
    },
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "性别",
      dataIndex: "gender",
      width: 100,
      render: (value: Gender) => {
        if (value === "Male") return <Tag color="blue">男</Tag>;
        return <Tag color="red">女</Tag>;
      },
    },
    {
      title: "电话",
      dataIndex: "phone",
      width: 200,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      width: 250,
    },
    {
      title: "操作",
      key: "opt",
      width: 150,
      align: "center",
      render: (val, record) => {
        return (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="view"
                  onClick={() =>
                    this.props.history.push(
                      `${this.props.match.url}/view/${record.id}`
                    )
                  }
                >
                  查看
                </Menu.Item>
                <Menu.Item key="edit" onClick={() => this.edit(record)}>
                  编辑
                </Menu.Item>
                <Menu.Item key="delete" onClick={() => this.remove(record)}>
                  删除
                </Menu.Item>
              </Menu>
            }
          >
            <Button icon={<SettingOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  state: State = {
    visible: false,
    keyword: "",
    users: [],
    current: null,
  };

  edit(record: IPerson) {
    this.setState({
      current: record,
      visible: true,
    });
  }

  add() {
    this.setState({
      current: null,
      visible: true,
    });
  }

  remove(record: IPerson) {
    Modal.confirm({
      title: "提示",
      content: `确定要删除用户“${record.name}”吗？`,
      onOk: async () => {
        let result = await api.removePerson(record.id);
        if (result.stat === "OK") {
          message.success("用户已删除");
          this.getData();
        } else {
          message.warning(result.message);
        }
      },
    });
  }

  async getData() {
    let handle = message.loading("正在加载数据...", 0);
    try {
      let result = await api.listPerson(this.state.keyword);
      if (result.stat === "OK") {
        this.setState({
          users: result.rows,
        });
      }
      handle();
    } catch (error) {
      handle();
      message.error("网络错误");
    }
  }

  reset() {
    this.setState(
      {
        keyword: "",
      },
      this.getData
    );
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <>
        <Form layout="inline" className={style.toolbar}>
          <Form.Item>
            <Button
              type="primary"
              onClick={this.add.bind(this)}
              icon={<PlusOutlined />}
            >
              添加用户
            </Button>
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="姓名"
              autoComplete="off"
              allowClear
              value={this.state.keyword}
              onKeyDown={(e) => {
                if (e.key === "Enter") this.getData();
              }}
              onChange={(e) => {
                this.setState({ keyword: e.target.value.trim() });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.getData.bind(this)}>
              搜索
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={this.reset.bind(this)}>重置</Button>
          </Form.Item>
        </Form>
        <Table
          dataSource={this.state.users}
          rowKey="id"
          columns={this.columns}
        />
        {this.state.visible && (
          <Edit
            record={this.state.current}
            onSuccess={this.getData.bind(this)}
            afterClose={() => this.setState({ visible: false })}
          />
        )}
      </>
    );
  }
}
