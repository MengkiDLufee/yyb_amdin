import React, { Component } from 'react'
// import  {Redirect} from 'react-router-dom'
import { Form, Input, Button ,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less'//引入样式
// import logo from './images/login_header_logo.png'
import {reqLogin} from '../../api/index'

 class Login extends Component {
    // login =() => {
    //     this.props.history.replace('/home')
    //     message.success('登陆成功')
    // }
    
    onFinish = values => {
        console.log( '登陆请求',values);
        //进行登录请求
        // this.props.history.replace('/home')
        const {username,password} = values
        // message.success('登陆成功')
        reqLogin(username,password)
            .then(
                res => {
                    console.log(res)
                    message.success('登陆成功！')
                    this.props.history.replace('/home')//路由跳转
                }
            )
      };

      onFail = values => {
          console.log(values)
        message.warning('校验未通过！')

      }

    render() {

        //const form =this.props.form

        return (
            <div className="login">
                <header className="login-header">
                    <h1>优孕宝登陆</h1>
                    {/* <img src={logo} alt="logo"/> */}
                </header>
                <section className="login-content">
                    <div style={{height:'60px'}}>
                        <h2 style={{borderBottom:'1px solid #d6d5d5',color:'#f05d73'}}>用户登录</h2>
                    </div>
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFail}
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
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password" placeholder="密码"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" 
                        className="login-form-button" 
                        htmlType="submit"
                        // onClick={this.login}
                        >
                        登 录
                        </Button>
                    </Form.Item>
                    </Form>
                </section>

            </div>
        )
    }
}

export default Login