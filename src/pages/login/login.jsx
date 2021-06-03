import React, { Component } from 'react'
// import  {Redirect} from 'react-router-dom'
import {
    Form,
    Input,
    Button,
    message,
    Checkbox
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'//引入样式
import logo from '../../assets/images/logo.png'
import logo1 from '../../assets/images/logo_1.png'
import { reqLogin } from '../../api/index'

class Login extends Component {
    login = () => {
        let form = this.form.current;
        form.validateFields()//表单输入校验
            .then((values) => {
                console.log('登陆请求', values);
                //进行登录请求
                // this.props.history.replace('/home')
                const { username, password } = values
                let params = {
                    account: username,
                    password,
                }
                console.log(this.state.check, params);
                if (this.state.check) {
                    localStorage.setItem('acount_yyb', username);
                    localStorage.setItem('password_yyb', password)
                }
                if (!this.state.check) {
                    localStorage.removeItem('acount_yyb');
                    localStorage.removeItem('password_yyb');
                }
                reqLogin(params)
                    .then(
                        res => {
                            console.log(res)
                            if (res.data.code === 1102) {
                                message.success('登陆成功！')
                                sessionStorage.setItem('token', res.data.data.token);
                                this.props.history.replace('/home')//路由跳转
                            } else {
                                message.warning(res.data.msg)
                            }


                        }
                    )
            })
    }
    state = {
        check: localStorage.getItem('check') || false
    }
    form = React.createRef()

    componentDidMount() {
        console.log(localStorage.getItem('acount_yyb'), localStorage.getItem('password_yyb'));
        // const form =React.createRef()
        const account = localStorage.getItem('acount_yyb')
        const password = localStorage.getItem('password_yyb')
        const form = this.form.current
        if (form) {
            if (account !== null && password !== null) {
                form.setFieldsValue({
                    username: localStorage.getItem('acount_yyb'),
                    password: localStorage.getItem('password_yyb')
                })
                console.log(this.form);
            }
        }
        console.log(form);
    }


    checkChange = () => {
        localStorage.setItem('check', !this.state.check)
        this.setState({
            check: !this.state.check
        })
    }

    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                </header>
                <section className="login-content">
                    <div style={{ height: '60px', display: 'flex', alignItems: 'center' }}>
                        <img src={logo1} alt="logo1" style={{ width: '40px', height: '40px' }} />
                        <h2
                            style={{
                                color: '#f05d73',
                                marginLeft: '20px',
                                lineHeight: '60px'
                            }}>
                            用户登录
                        </h2>
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        // onFinish={this.onFinish}
                        // onFinishFailed={this.onFail}
                        ref={this.form}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入账号' }]}//声明式验证

                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="账号"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password" placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item
                            name="remember"
                            noStyle
                        >
                            <Checkbox
                                checked={this.state.check}
                                onChange={this.checkChange}
                            >记住密码</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                className="login-form-button"
                                onClick={this.login}
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