//能发送ajax异步函数请求的模块
//封装axios库
//函数的返回值是promise对象

import axios from 'axios'

export default function ajax(url, data={},type='GET') {
    if(type==='GET') {
        return axios.get(url, {//配置对象
            params: data  //指定请求参数
        })
    } else {
        return axios.post (url, data)
    }

}