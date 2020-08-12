import React from 'react'

import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './login.scss'
export default class LoginDom extends React.Component {
    onFinish = (values) => {
        console.log(values)
        this.props.history.push('/')
    }
    render() {
        return (
            <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>
                <p className="login-text">登录</p>
                <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </Form.Item>
                <Form.Item className='password-opera'>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                    <span className="login-form-forgot">
                        忘记密码
                    </span>
                </Form.Item>
            </Form>
        )
    }
}
