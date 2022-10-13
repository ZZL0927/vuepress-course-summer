import * as React from "react";
import { Form, Input, Button, message } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { FormInstance } from "antd/lib/form";

import style from "./style.module.scss";
import * as api from "../../services/api";

interface Values {
  username: string;
  password: string;
}

export default class Login extends React.Component<RouteComponentProps> {
  form: FormInstance<Values>;

  async submit() {
    try {
      let values = await this.form.validateFields();
      let result = await api.login(values.username, values.password);
      if (result.stat === "OK") {
        message.success("登录成功");
        this.props.history.push("/home");
      } else {
        message.error(result.message);
      }
    } catch (error) {}
  }

  render() {
    return (
      <div className={style.wrap}>
        <Form className={style.form} ref={(el) => (this.form = el)}>
          <div className={style.title}>登录</div>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" onClick={this.submit.bind(this)}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
