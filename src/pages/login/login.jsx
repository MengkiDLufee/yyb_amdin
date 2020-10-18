import React, { Component } from 'react'
// import  {Redirect} from 'react-router-dom'
import { Form, Input, Button ,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less'
// import logo from './images/login_header_logo.png'

 class Login extends Component {
    login =() => {
        this.props.history.replace('/')
        message.success('登陆成功')
    }
    

    render() {
        const onFinish = values => {
            console.log( '登陆请求',values);
            let K=values
            console.log(K)
          };


        //const form =this.props.form

        return (
            <div className="login">
                <header className="login-header">
                    <h1>优孕宝登陆</h1>
                    {/* <img src={logo} alt="logo"/> */}
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入账号' }]}//声明式验证
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="账号" 
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password" placeholder="密码"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" 
                        className="login-form-button" 
                        htmlType="submit"
                        onClick={this.login}
                        >
                        登 陆
                        </Button>
                    </Form.Item>
                    </Form>
                </section>

            </div>
        )
    }
}

export default Login