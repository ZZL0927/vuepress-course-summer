import * as React from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import { FormInstance } from "antd/lib/form";

import { IPerson, Gender } from "../../types";
import * as api from "../../services/api";

interface Props {
  record?: IPerson;
  afterClose?: () => void;
  onSuccess?: () => void;
}

interface State {
  disabled: boolean;
  visible: boolean;
  name: string;
  gender: Gender;
  phone: string;
  email: string;
  avatar: string;
}

export default class Edit extends React.Component<Props, State> {
  form: FormInstance<IPerson> = null;
  state: State = {
    disabled: false,
    visible: true,
    name: this.props.record?.name,
    gender: this.props.record?.gender || "Male",
    phone: this.props.record?.phone,
    email: this.props.record?.email,
    avatar: this.props.record?.avatar,
  };

  close() {
    this.setState({
      visible: false,
    });
  }

  async submit() {
    try {
      let values = await this.form.validateFields();
      this.setState({
        disabled: true,
      });
      if (this.props.record) {
        let result = await api.updatePerson({
          id: this.props.record.id,
          ...values,
        });
        if (result.stat === "OK") {
          message.success("用户更新成功");
          this.close();
          this.props?.onSuccess();
        } else {
          message.error(result.message);
        }
      } else {
        let result = await api.addPerson(values);
        if (result.stat === "OK") {
          message.success("用户添加成功");
          this.close();
          this.props?.onSuccess();
        } else {
          message.error(result.message);
        }
      }
    } catch (error) {
    } finally {
      this.setState({
        disabled: false,
      });
    }
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title={this.props.record ? "编辑用户" : "添加用户"}
        onCancel={this.close.bind(this)}
        maskClosable={false}
        afterClose={this.props.afterClose}
        destroyOnClose
        footer={[
          <Button type="text" key="cancel" onClick={this.close.bind(this)}>
            取消
          </Button>,
          <Button
            type="primary"
            key="ok"
            onClick={this.submit.bind(this)}
            disabled={this.state.disabled}
          >
            确认
          </Button>,
        ]}
      >
        <Form ref={(el) => (this.form = el)} initialValues={this.props.record}>
          <Form.Item
            name="name"
            label="姓名"
            rules={[
              {
                required: true,
                message: "请填写姓名",
              },
            ]}
          >
            <Input placeholder="请填写姓名" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="性别"
            rules={[
              {
                required: true,
                message: "请选择性别",
              },
            ]}
          >
            <Select placeholder="请选择性别">
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="phone"
            label="电话"
            rules={[
              {
                required: true,
                message: "请填写电话",
              },
            ]}
          >
            <Input placeholder="请填写电话" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              {
                required: true,
                message: "请填写邮箱",
              },
            ]}
          >
            <Input
              placeholder="请填写邮箱"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="头像"
            rules={[
              {
                required: true,
                message: "请填写头像地址",
              },
            ]}
          >
            <Input placeholder="请填写头像地址" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
