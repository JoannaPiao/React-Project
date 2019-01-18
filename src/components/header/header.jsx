import React, {Component} from 'react'

import './header.less'
import {Row,Col} from 'antd'

/*
头部组件
 */
export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <Row className='header-top'>
                    <span>欢迎，xxx</span>
                    <a href="javascript:">退出</a>
                </Row>
                <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>首页</Col>
                    <Col span={20} className='weather'>
                        <span className='date'>2019-01-17</span>
                        <span className='weather-img'>
                            <img src='' alt=""/>
                        </span>
                        <span className=''></span>

                    </Col>

                </Row>


            </div>
        )
    }
}
