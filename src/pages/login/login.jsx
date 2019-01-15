import React, {Component} from 'react'
import {Icon, Form, Input, Button} from 'antd'
import './index.less'
import logo from '../../assets/images/logo.png'


/*
登录的路由组件
 */
const Item = Form.Item
export default class Login extends Component {
    render() {

        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo"/>
                    React项目：后台管理系统
                </div>

                <div className="login-content">
                    <div className="login-box">
                        <div className="title">用户登录</div>
                        <LoginForm/>
                    </div>
                </div>
            </div>

        )
    }
}

/*
包含《Form》被包装组件
 */
class LoginForm extends React.Component {
    render() {
        //getFieldDecorator方法
        const {getFieldDecorator} = this.props.form

        this.props.form.getFieldValue('username')

        return (
            <Form className="login-form">
                <Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '必须输入用户名'}]
                    })(
                        <Input  placeholder='请输入用户名' prefix={<Icon type="user" />}/>
                    )}
                </Item>
                <Form.Item>
                            <Input placeholder='请输入密码' type="password"
                                prefix={<Icon type="lock" />}/>
                                </Form.Item>
                                <Form.Item>
                                <Button type="primary" className="login-form-button">登录</Button>
                                </Form.Item>
                                </Form>
                                )
                            }
                        }
//包装包含Form的组件的包装组件， 生成一个新的组件
//包装组件会向被包装组件
                        LoginForm = Form.create()(LoginForm)