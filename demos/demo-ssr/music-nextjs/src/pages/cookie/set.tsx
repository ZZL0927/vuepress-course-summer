import Head from 'next/head'
import { useRouter } from 'next/router'
import { Form, Input, Button, Toast } from 'antd-mobile'

import * as sessionService from '../../services/session'

export default function SetCookie() {
  const router = useRouter()

  const onSubmit = async (values: any) => {
    const result = await sessionService.set(values.name)
    if (result.code === 0) {
      router.push('/cookie/get')
      Toast.show({
        content: '设置成功'
      })
    } else {
      Toast.show({
        content: result.message
      })
    }
  }

  return (
    <div>
      <Head>
        <title>设置Session会话状态</title>
      </Head>
      <Form
        mode="card"
        footer={
          <Button block color="primary" type="submit">
            设置
          </Button>
        }
        onFinish={onSubmit}
      >
        <Form.Header>设置Session会话状态</Form.Header>
        <Form.Item
          name="name"
          label="昵称"
          rules={[{ required: true, message: '昵称不能为空' }]}
        >
          <Input placeholder="昵称" />
        </Form.Item>
      </Form>
    </div>
  )
}
