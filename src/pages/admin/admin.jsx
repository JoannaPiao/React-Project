import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import MemoryUtils from '../../utils/MemoryUtils'
import {Row, Col} from 'antd'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import './admin.less'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'



/*
后台管理主界面的路由组件
 */
export default class Admin extends React.Component {
    render() {
        //检查用户是否已经登录，如果还没有，自动跳转到登录界面
        const user = MemoryUtils.user
        if (!user || !user._id) {
            // this.props.history.replace('/login') 这个用在事件回调函数中
            console.log(user);
            return <Redirect to='/login'/>
        }

        return (
            <Row className='container'>
                <Col span={4}>
                    <LeftNav></LeftNav>

                </Col>
                <Col span={20} className='main'>
                    <Header/>
                    <div className='content'>
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/product' component={Product}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/charts/bar' component={Bar}></Route>
                            <Route path='/charts/line' component={Line}></Route>
                            <Route path='/charts/pie' component={Pie}></Route>
                            <Redirect to='/home'/>
                        </Switch>
                    </div>

                    <Footer/>
                </Col>

            </Row>

        )
    }
}