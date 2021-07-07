/**
 * 用于local数据存储管理的工具模块
 * localStorage有一定兼容性问题IE8+，Edge12+ ...
 * 使用store可兼容所有浏览器
 */
import store from 'store'

const USER_KEY = 'user_key'
export default {
  /**
   * 保存user
   */
saveUser(user) {
  // localStorage.setItem(USER_KEY,JSON.stringify(user))
  store.set(USER_KEY,user)
},

  /**
   * 读取user
   */
getUser(){
  // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  return store.get(USER_KEY) || {}
},

  /**
   * 删除user
   */
removeUser() {
  // localStorage.removeItem(USER_KEY)
  store.remove(USER_KEY)
}

}