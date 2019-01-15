import React, {Component} from 'react'
//引入路由组件
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

/*
应用根组件
 */
export default class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/*先后顺序不能变，请求路径和路由路径的匹配：逐层匹配从前到后*/}
          <Route path='/login' component={Login} />
          <Route path='/' component={Admin} />
        </Switch>
      </BrowserRouter>
    )
  }
}
/*向外暴露*/

