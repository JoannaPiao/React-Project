import React, {Component} from 'react'
import {
    Icon,
    Form,
    Input,
    Button
} from 'antd'
import './index.less'
import PropTypes from 'prop-types'
import {reqLogin} from '../../api'
import logo from '../../assets/images/logo.png'
import storageUtils from '../../utils/storageUtils'
import MemoryUtils from '../../utils/MemoryUtils'


/*
登录的路由组件
 */
const Item = Form.Item
export default class Login extends Component {

    state = {
        errorMsg: '',//登录失败错误提示信息
    }

    //登录请求
    login = async (username, password) => {
        //console.log('login', username, password);
        const result = await reqLogin(username, password)
        if (result.status === 0) {//登录成功
            const user = result.data
            //保存user
            storageUtils.saveUser(user)//local中 本地
            MemoryUtils.user = user  //内存中
            /*
           LocalStorage
           sessionStorage
            */
            // localaStorage.setItem('USER_KEY',JSON.stringify(user)) 现在不用这个了

            //跳转到管理界面
            this.props.history.replace('/admin')
        } else {//登录失败
            this.setState({
                //更新错误信息，如果status为1的话 一般都有msg属性
                errorMsg: result.msg
            })

        }
    }

    render() {
        const {errorMsg} = this.state
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo"/>
                    React项目：后台管理系统
                </div>

                <div className="login-content">
                    <div className="login-box">
                        <div className="error-msg-wrap">
                            <div className={errorMsg ? "show" : ""}>
                                {errorMsg}
                            </div>
                        </div>

                        <div className="title">用户登录</div>
                        <LoginForm login={this.login}/>
                    </div>
                </div>
            </div>

        )
    }
}

/*
包含<Form>被包装组件
 */
class LoginForm extends React.Component {
    static propTypes = {
        login: PropTypes.func.isRequired
    }


    clickLogin = () => {
        //只有当验证没有错误时才输入的数据
        this.props.form.validateFields(async (error, values) => {
            console.log('validateFields', error, values);
            if (!error) {
                console.log('收集表单数据', values);
                const {username, password} = values
                this.props.login(username, password)
            } else {
                //this.props.form.resetFields()//重置所有输入框
            }
        })


        //得到输入的用户名，手动取
        /*
        const username = this.props.form.getFieldValue('username')
        alert(username)
         */

    }
    checkPassword = (rule, value, callback) => {//如果不满足要求，通过调用callback来指定响应的message
        if (!value) {
            callback('必须输入密码')
        } else if (value.length < 4 || value.length > 8) {
            callback('密码必须是4到8位')
        } else {
            callback()//如果不传参数代表成功
        }
    }

    render() {
        //getFieldDecorator方法
        const {getFieldDecorator} = this.props.form

        this.props.form.getFieldValue('username')

        return (
            <Form className="login-form">
                <Item>
                    {getFieldDecorator('username', {
                        initialValue: 'admin',//input的默认值
                        rules: [//声明式验证配置
                            {type: "string", required: true, message: '必须输入用户名'},
                            {min: 4, message: '长度不能少于4位'}

                        ]
                    })(
                        <Input placeholder='请输入用户名' prefix={<Icon type="user"/>}/>
                    )}
                </Item>
                <Form.Item>
                    {
                        getFieldDecorator('password', {
                            rules: [{validator: this.checkPassword}]
                        })(
                            <Input placeholder='请输入密码' type="password"
                                   prefix={<Icon type="lock"/>}/>
                        )

                    }

                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="login-form-button" onClick={this.clickLogin}>登录</Button>
                </Form.Item>
            </Form>
        )
    }
}

//包装包含Form的组件的包装组件， 生成一个新的组件
//包装组件会向被包装组件
LoginForm = Form.create()(LoginForm)