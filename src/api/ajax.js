//能发送ajax异步函数请求的模块
//封装axios库
//函数的返回值是promise对象

//利用promise统一处理请求错误

import axios from 'axios'
import qs from 'qs'//将url中的参数转为对象;将对象转为url参数形式
import {
    message
} from 'antd'

// const baseUrl = 'http://java.xixibackup.me:8080'
// axios.defaults.baseURL = 'http://java.xixibackup.me:8080'
// axios.defaults.baseURL = 'http://192.168.1.173:8080'
axios.defaults.baseURL = 'http://192.168.2.102:8080'


/* 取消请求设置 */
const CancelToken = axios.CancelToken;
let pendList = [];
/**
 * 移除重复请求
 * @param {Object} config  请求配置对象
 */
function removePending(config) {
    for (let p of pendList) {
        let currentPend = createInterceptUrl(config); //本次请求信息
        let historyPend = config.url.includes(axios.defaults.baseURL) ? axios.defaults.baseURL + p.u : p.u; //历史请求信息(请求的config.url中不包含baseUrl，但响应中的url会包含baseUrl，此处先处理两者差异)
        let isMatch = currentPend === historyPend; //是否匹配

        if (isMatch) {
            let index = pendList.indexOf(p);
            p.f('取消请求'); //执行取消操作
            index > -1 && pendList.splice(index, 1);
            return;
        }
    }
}

/**
 * 延迟请求，相同请求不得在短时间内重复发送
 * @param {Array} reqList - 请求缓存列表
 * @param {String} url - 当前请求地址
 */
function delayRepeatRequest(config) {
    setTimeout(() => {
        removePending(config);
    }, 500);
}

/**
 * 创建用于拦截请求的标识，为保证请求信息完整，组合了请求的地址、类型、参数
 * @param {Object} config  axios请求的配置对象
 * @returns {String}  返回用于拦截的字符串标识
 * qs.parse()--将url解析成对象形式
 * qs.stringify()--将对象序列化成url形式
 */
function createInterceptUrl(config) {
    return config.url + '&' + config.method + '&' + qs.stringify(config.params) + '&' + qs.stringify(config.data);
}

/* 请求拦截 */
axios.interceptors.request.use(
    config => {
        removePending(config); //在一个axios发送前执行一下取消操作
        /* 创建取消请求的token，并把本次请求的信息添加到请求列表 */
        config.cancelToken = new CancelToken(c => {
            pendList.push({
                u: createInterceptUrl(config),
                f: c
            });
        });
        return config;
    },
    error => {
        return Promise.error(error);
    }
);

/* 响应拦截 */
axios.interceptors.response.use(
    response => {
        delayRepeatRequest(response.config); //在一个axios响应后再执行一下取消操作，把已经完成的请求从pendList中移除
                                            //response中的config为上次请求的所有信息，即请求拦截中的config = 响应拦截中的config

        return response.status === 200 ? Promise.resolve(response) : Promise.reject(response); //状态码为200接口访问成功，其他抛出错误
    },
    error => {
        //axios.isCancel(error); //验证是否是取消请求的错误
        return Promise.reject(error);
    }
);



export default function ajax(url, data = {}, type = 'GET', config) { //默认空对象，get请求方式
    return new Promise((resolve, reject) => {
        type = type.toUpperCase()
        let promise
        //1.执行ajax请求
        if (type === 'GET') {
            promise = axios.get(url, { //配置对象
                params: data //指定请求参数
            })
        } else if (type === 'POST') { //post请求
            promise = axios.post(url, data, config)
        }
        //2.请求成功，调用resoleve
        promise.then(res => {
                resolve(res)
            }) //3.请求错误时不用reject，使用message进行提示，若使用reject相当于未进行操作，在具体请求中话仍需要处理
            .catch(err => {
                // reject(message.error('请求出错：' + err))
                message.error('请求出错：' + err)
                console.log(err)
            })
    })
}