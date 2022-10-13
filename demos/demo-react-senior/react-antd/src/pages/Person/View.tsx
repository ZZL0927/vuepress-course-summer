import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Form, Breadcrumb, message } from "antd";

import style from "./style.module.scss";
import { IPerson } from "../../types";
import * as api from "../../services/api";

interface Params {
  id: string;
}

interface State {
  person: IPerson;
}

export default class View extends React.Component<
  RouteComponentProps<Params>,
  State
> {
  state: State = {
    person: null,
  };

  async getData() {
    let result = await api.getPerson(this.props.match.params.id);
    if (result.stat === "OK") {
      this.setState({
        person: result.data,
      });
    } else {
      message.error(result.message);
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home/person">人员管理</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>查看详情</Breadcrumb.Item>
        </Breadcrumb>
        <Form {...layout} className={style.view} labelAlign="left">
          <Form.Item label="头像">
            <img src={this.state.person?.avatar} alt="" />
          </Form.Item>
          <Form.Item label="姓名">{this.state.person?.name}</Form.Item>
          <Form.Item label="性别">{this.state.person?.gender}</Form.Item>
          <Form.Item label="电话">{this.state.person?.phone}</Form.Item>
          <Form.Item label="邮箱">{this.state.person?.email}</Form.Item>
        </Form>
      </>
    );
  }
}
