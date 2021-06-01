/*
  根据接口文档定义接口函数
  包含应用中所有请求接口的模块
  每个函数返回值都是promise
*/
import ajax from './ajax'

//导出接口(可用于按条件搜索和选择搜索)
export function exportFile (url,data) {
    ajax(url, data,'POST',{
      // // 设置responseType对象格式为blob
      responseType: "blob"
      })
      .then( res => {
        // 创建下载的链接
        const url = window.URL.createObjectURL(new Blob([res.data],{
          type: 'application/vnd.ms-excel;charset=utf-8'// 设置该文件的mime类型，这里对应的mime类型对应为.xlsx格式   
        }));
            const link = document.createElement('a');
            link.href = url;
            // 从header中获取服务端命名的文件名
            const fileName =decodeURI(res.headers['content-disposition'].split('\'')[2]);
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // 下载完成移除元素
            window.URL.revokeObjectURL(url); // 释放掉blob对象
          })
  }

/* 7.系统管理模块 */
/* 7.1用户管理 */
//7.1.1搜索系统管理用户
export function querySysUser(data) {
    return ajax('/system/manage/user/info/list', data, 'POST')
}
//1.1.2  查询所有部门
export function queryAlldept() {
    return ajax('/system/manage/user/dept/list', 'GET')
}
//1.1.3 查询所有职位
export function queryAllPosition() {
    return ajax('/system/manage/user/position/list', 'GET')
}
//1.1.4 添加系统管理用户
export function addSysUser(data) {
    return ajax('/system/manage/user/info/add', data, 'POST')
}
//1.1.5 导出系统管理用户
export function exportSysUser(data) {
    exportFile('/system/manage/user/info/export/choose', data)
}
//1.1.6 修改用户状态
export function modifySysUserStatus(userId, status, data) {
    let statusUrl = `/system/manage/user/status/${userId}/${status}`
    return ajax(statusUrl, data, 'GET')
}
//1.1.7删除用户
export function deleteSysUser(userId, userPosId,data) {
    let deleteUrl = `/system/manage/user/info/delete/${userId}/${userPosId}`
    return ajax(deleteUrl, data, 'GET')
}
//1.1.8 查询所有角色
export function queryAllSysRole() {
    return ajax('/system/manage/user/query/all/role', 'GET')
}
//1.1.9 分配角色
export function allocateSysRole(data) {
    return ajax('/system/manage/user/allocation/role', data, 'POST')
}
//1.1.10重置密码
export function resetSysUserPwd(userId) {
    let resetPwdUrl = `/system/manage/user/password/reset/${userId}`
    return ajax(resetPwdUrl, 'GET')
}
//1.1.11 修改系统管理用户信息
export function modifySysUser(data) {
    return ajax('/system/manage/user/info/modify', data, 'POST')
}
/* 7.2角色管理 */
//2.1.1 查询角色信息
export function querySysRole(data) {
    return ajax('/system/manage/role/list', data, 'POST')
}
//2.1.2 查询所有角色queryAllSysRole

//2.1.3 添加角色信息
export function addSysRole(data) {
    return ajax('/system/manage/user/role/add', data, 'POST')
}
//2.1.4 删除角色信息
export function deleteSysRole(roleId,data) {
    return ajax(`/system/manage/user/role/remove/${roleId}`,data,'GET')
}
//2.1.5  导出角色信息
export function exportSysRole(data) {
    exportFile('/system/manage/user/role/export/condition', data)
}
//2.1.6 查询所有权限
export function queryAllPermission() {
    return ajax('/system/manage/user/role/all/permission','GET')
}
//2.1.7 查询该角色拥有的权限
export function queryRoleHavePerm(roleId) {
    let queryUrl = `/system/manage/user/role/have/perm/${roleId}`
    return ajax(queryUrl, 'GET')
}
//2.1.8 给角色分配权限
export function allocateRolePermission(data) {
    return ajax('/system/manage/user/role/allocate/permission', data, 'POST')
}
//2.1.9 修改角色信息
export function modifySysRole(data) {
    return ajax('/system/manage/user/role/modify', data, 'POST')
}
/* 7.3部门管理 */
//3.1.1 查询部门信息
export function querySysDept(data) {
    return ajax('/system/manage/dept/info/list', data, 'POST')
}
//3.1.2 修改部门信息
export function modifySysDept(data) {
    return ajax('/system/manage/dept/info/modify', data, 'POST')
}
//3.1.3 添加部门信息
export function addSysDept(data) {
    return ajax('/system/manage/dept/info/add', data, 'POST')
}
//3.1.4 删除部门信息
export function deleteSysDept(deptId, data) {
    let deleteUrl = `/system/manage/dept/info/remove/${deptId}`
    return ajax(deleteUrl, data, 'GET')
}
//3.1.5 导出部门信息
export function exportSysDept(data) {
    exportFile('/system/manage/dept/info/export/choose', data)
}
/* 7.4登录日志 */
//4.1.1 查询登录日志
export function queryLoginLog(data) {
    return ajax('/system/manage/login/log/list', data, 'POST')
}
//4.1.2删除选中的登录日志
export function deleteLoginLog(data) {
    return ajax('/system/manage/login/log/remove', data, 'POST')
}
/* 7.5业务日志 */
//5.1.1查询业务日志
export function queryWorkLog(data) {
    return ajax('/system/manage/operation/log/list', data, 'POST')
}
//5.1.2 删除选择的业务日志
export function deleteWorkLog(data) {
    return ajax('/system/manage/operation/log/remove', data, 'POST')
}
/* 7.6 职位管理 */
//6.1.1 查询职位信息
export function queryPosition(data) {
    return ajax('/system/manage/position/info/list', data, 'POST')
}
//6.1.2 修改职位信息
export function modifyPosition(data) {
    return ajax('/system/manage/position/info/modify', data, 'POST')
}
//6.1.3 新增职位信息
export function addPosition(data) {
    return ajax('/system/manage/position/info/add', data, 'POST')
}
//6.1.4 删除部门信息
export function deleteSysPosition(positionId, data) {
    let deletePositionUrl = `/system/manage/position/info/remove/${positionId}`
    return ajax(deletePositionUrl, data, 'GET')
}
//6.1.5 导出职位信息
export function exportSysPosition(data) {
    exportFile('/system/manage/position/info/export/choose', data)
}