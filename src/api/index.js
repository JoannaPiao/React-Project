/*
包含n个接口请求函数的模块
对ajax模块进一步封装，让发请求的调用代码更加简洁
函数返回的是promise对象

技能:根据接口文档定义接口请求函数
 */

import ajax from './ajax'

//登录
//传入对象 名称要对应  位置可以不用对应 但是用参数传  位置必须对应上   如果传的是参数 接收也要用参数  传的是对象 接收也要用对象
//如果是传两个参数  用哪个方式都行  如果有三个的话  可以偏向用对象传

//箭头函数如果用大括号
export  const  reqLogin =(username,password)=> ajax('./login',{username,password},'POST')

/*
可以简写
export function reqLogin({username, password}) {
    return ajax('/login', {username, password}, 'POST')
}

 */

//添加用户

export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')
