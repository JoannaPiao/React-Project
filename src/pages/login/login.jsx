import React, {Component} from 'react'

export default class Login extends Component {
    render() {
        return (
            <div>
                <div className="login-header">
                    <img src={logo}/>
                    React项目：后台管理系统
                </div>
                <div className="login-content">
                    <div className="login-box">
                        <div className="title">用户登陆</div>
                        <Form className="login-form">
                            <Form.Item>
                                <Input placeholder="用户名" prefix={Icon type="user"}/>
                            </Form.Item>
                            <Form.Item>
                                <Input type="password" placeholder="密码"/>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>

        )
    }
}