/*
  根据接口文档定义接口函数
  包含应用中所有请求接口的模块
  每个函数返回值都是promise
*/
import ajax from './ajax'


//登陆接口
export function reqLogin(username, password) {
    return ajax('/login', { username, password }, 'POST')
}


//搜索导出接口
export function exportFile(url, data) {
    ajax(url, {
            data,
            // 设置responseType对象格式为blob
            responseType: "blob"
        }, 'POST')
        .then(res => {
            console.log(res)
                // 创建下载的链接
            const url = window.URL.createObjectURL(new Blob([res.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    // 设置该文件的mime类型，这里对应的mime类型对应为.xlsx格式   
            }));
            const link = document.createElement('a');
            link.href = url;
            // 从header中获取服务端命名的文件名
            const fileName = decodeURI(res.headers['content-disposition'].split('\'')[2]);
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        })
}

/*
5.实验管理模块
*/
//5.1.1 实验数据
export function expList(data) {
    return ajax('/experiment/list', data, 'POST')
}
//5.1.2.1 得到所有实验人员
export function getExpPerson() {
    return ajax('/experiment/get_test_people', {}, 'GET')
}

//5.1.2.2 得到所有试剂种类
export function getPaper() {
    return ajax('/experiment/get_paper_type', {}, 'GET')
}


//5.1.2.3 根据试剂种类选择批号

//5.1.2.4添加实验数据

//5.1.3 修改（修改实验计划相关信息，正在进行实验的计划无法修改）

//5.1.4删除（删除实验计划相关信息）



//5.2.1 实验人员信息
export function exp_person(data) {
    return ajax('/testperson/list', data, 'POST')
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
export function exportSysUser() {
    return ajax('/system/manage/user/info/export/condition', 'GET')
}
//1.1.6 修改用户状态
export function modifySysUserStatus(data) {
    return ajax('/system/manage/user/status/{userId}/{status}', data, 'GET')
}
//1.1.7删除用户
export function deleteSysUser(data) {
    return ajax('/system/manage/user/info/delete/{userId}', data, 'GET')
}
//1.1.8 查询所有角色
export function queryAllSysRole(data) {
    return ajax('/system/manage/user/query/all/role', data, 'GET')
}
/* 7.2角色管理 */
/* 7.3部门管理 */
/* 7.4登录日志 */
//7.5.1查询登录日志
export function queryLoginLog(data) {
    return ajax('/system/manage/login/log/list', data, 'POST')
}
//7.4.2 清空日志
export function emptyLoginLog(data) {
    return ajax('/manage/operation/log/remove/all', data, 'GET')
}
/* 7.5业务日志 */
//7.5.1查询业务日志
export function queryWorkLog(data) {
    return ajax('/user/base/info/list', data, 'POST')
}
// export function queryLog(data){
//   return ajax('/system/manage/operation/log/list',data,'POST')
// }
//7.5.2 清空日志
export function emptyWorkLog(data) {
    return ajax('/manage/operation/log/remove/all', data, 'GET')
}