import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './login.scss'
import { loginApi } from '@/api/modules/user'
import { setUserInfoStorage, setTokenCookies } from '@/utils/commonSave'
import { ILoginParams } from '@/typescript/interface/user/user-interface'
import { ResultCodeEnum } from '@/typescript/enum'
const LoginDom = () => {
  const history = useHistory()
  let [loginForm] = useState({ userName: 'liuzhao', password: 123456 })
  const onFinish = async values => {
    const params: ILoginParams = {
      userName: values.userName,
      password: values.password
    }
    const data = await loginApi(params)
    console.log(data, 123)
    if (data.code === ResultCodeEnum.success) {
      message.success('登录成功')
      setUserInfoStorage(data.data)
      setTokenCookies(`Bearer ${data.data.token}`)
      history.push('/')
    } else message.error(data.msg)
  }
  return (
    <Form
      labelAlign="left"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      name="normal_login"
      className="login-form"
      initialValues={loginForm}
      onFinish={onFinish}
    >
      <p className="login-text">登录</p>
      <Form.Item
        label="用户名"
        name="userName"
        rules={[{ required: false, message: '请输入用户名!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: false, message: '请输入密码' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} className="password-opera">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
        <span className="login-form-forgot">忘记密码</span>
      </Form.Item>
    </Form>
  )
}
export default LoginDom