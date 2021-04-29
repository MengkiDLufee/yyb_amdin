//能发送ajax异步函数请求的模块
//封装axios库
//函数的返回值是promise对象

//利用promise统一处理请求错误


import axios from 'axios'
import {message} from 'antd'

const baseUrl = 'http://java.xixibackup.me:8080'

export default function ajax(url, data={},type='GET',config) {//默认空对象，get请求方式
    return new Promise((resolve , reject) => {
        let promise
        //1.执行ajax请求
        if(type==='GET') {
            promise = axios.get(baseUrl + url, {//配置对象
                params: data  //指定请求参数
            })
        } else {//post请求
            promise = axios.post (baseUrl + url, data,config)
        }
        //2.请求成功，调用resoleve
        promise.then(res => {
            resolve(res)
        })//3.请求错误时不用reject，使用message进行提示，若使用reject相当于未进行操作，在具体请求中话仍需要处理
        .catch(err => {
            reject(message.error('请求出错：' + err))
            message.error('请求出错：' + err)
        })
    })
}
