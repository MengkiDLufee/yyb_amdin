//根据接口文档定义接口函数
//包含应用中所有请求接口的模块
//每个函数返回值都是promise
import ajax from './ajax'


 //登陆接口
export const  reqLogin = (username,password) => {
  return ajax('/login',{username,password},'POST')
}