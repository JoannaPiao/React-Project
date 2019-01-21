import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import './left-nav.less'
import {Menu, Icon} from 'antd'
import menuList from '../../config/menuConfig'

const SubMenu = Menu.SubMenu
const Item = Menu.Item

/*
左侧导航组件
 */
class LeftNav extends Component {

    /*
     得到当前用户需要显示的所有menu元素的列表
     使用递归调用
     找到有没有子元素 添加样式
      */

    getNodes = (list) => {
        return list.reduce((pre, item) => {
            if (item.children) {
                const subMenu = (
                    <SubMenu key={item.key}
                             title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
                        {
                            this.getNodes(item.children)
                        }
                    </SubMenu>
                )
                pre.push(subMenu)

                //计算的到当前请求路径对应的父菜单的key
                const path = this.props.location.pathname
                const cItem = item.children.find((child => child.key === path))//找子元素key和path相等
                if (cItem) {
                    this.openKey = item.key
                }
            } else {
                const menuItem = (
                    <Item key={item.key}>
                        <NavLink to={item.key}>
                            <Icon type={item.icon}/>{item.title}
                        </NavLink>
                    </Item>

                )
                pre.push(menuItem)
            }

            return pre
        }, [])

    }


    //在render之前调用 第一次render前 不会返回调用
    componentWillMount() {
        this.menuNodes = this.getNodes(menuList)
    }


    render() {
        //当前请求的路径 location 只有路由组件才有的属性
        const path = this.props.location.pathname
        return (
            <div className='left-nav'>
                <NavLink to='/home' className='logo'>
                    <img src="/static/media/logo.ba1f87ec.png" alt="logo"/>
                    <h1>硅谷后台</h1>
                </NavLink>

                <Menu mode="inline"
                      theme='dark'
                      defaultSelectedKeys={[path]}
                      defaultOpenKeys={[this.openKey]}>
                    {this.menuNodes}
                </Menu>

            </div>
        )
    }
}

// 讲一个非路由组件包装生成一个理由组件，向非路由组件传递路由组件才有的3个属性：history/location/match
//location可以获得到请求路径 math可以获得请求参数
export default withRouter(LeftNav)
