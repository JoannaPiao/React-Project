/*
封装一些用于local保存数据的工具函数
保存
读取
删除
 */

//value不能是函数，也不能是null和undefined
//typeof不能检测数组和对象
//setItem那个名字是自己随便起的
//store 这个方法使用是在GitHub里面找的一个
//store.set(name,value) 是set方法传的两个值 key和value
//store还有get remove方法

import store from 'store'

const USER_KEY = 'user_key'

function setItem(name, value) {
    if (value && typeof value !== 'function') {
        store.set(name, value)
    } else {
        alert('不支持此类型的数据存储')
    }
}

function getItem(name) {
    return store.get(name) || ''  //防止返回不到东西 给一个空串
}

function removeItem(name) {
    store.remove(name)
}

export default {
    //saveUser这个名字也不是绝对的
    saveUser(user) {
        setItem(USER_KEY, user)
    },

    getUser() {
        //必须要return出去 要不然没有返回值
        return getItem(USER_KEY)
    },

    removeUser() {
        removeItem(USER_KEY)
    }

}