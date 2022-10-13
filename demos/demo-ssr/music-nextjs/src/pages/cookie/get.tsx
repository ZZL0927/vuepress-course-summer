import Head from 'next/head'
import dayjs from 'dayjs'
import type { GetServerSideProps } from 'next'
import { useState } from 'react'
import { Toast, Button, Form, Input } from 'antd-mobile'
import { useRouter } from 'next/router'

import { ISession } from '../../libs/models'
import * as sessionService from '../../services/session'

export const getServerSideProps: GetServerSideProps = async ctx => {
  // 拼接需要的cookie字符串
  const cookie = sessionService.formatCookie(ctx.req.cookies)
  // 服务端请求如果需要验证登录身份需要手动传递cookie
  const data = await sessionService.get(cookie)
  if (data.code !== 0) {
    // 获取session失败，重定向跳转
    return {
      redirect: {
        destination: '/cookie/set',
        permanent: false
      }
    }
  }
  return {
    props: {
      session: data.data.session
    }
  }
}

interface Props {
  session: ISession
}

export default function GetCookie(props: Props) {
  const router = useRouter()
  const [session, setSession] = useState<ISession>(props.session)

  const refresh = async () => {
    // 前端请求浏览器会自动携带cookie，无需手动传递
    const data = await sessionService.get()
    if (data.code === 0) {
      setSession(data.data.session)
      Toast.show({
        content: '状态已刷新'
      })
    } else {
      Toast.show({
        content: '会话失效，请重新登录'
      })
      router.push('/cookie/set')
    }
  }

  return (
    <div>
      <Head>
        <title>获取Session会话状态</title>
      </Head>
      <Form
        mode="card"
        footer={
          <Button color="primary" block onClick={refresh}>
            刷新状态
          </Button>
        }
      >
        <Form.Header>获取Session会话状态</Form.Header>
        <Form.Item label="昵称">
          <Input value={session.name} readOnly />
        </Form.Item>
        <Form.Item label="创建时间">
          <Input
            value={dayjs(session.createdAt).format('YYYY/MM/DD HH:mm')}
            readOnly
          />
        </Form.Item>
      </Form>
    </div>
  )
}
