/*
  根据接口文档定义接口函数
  包含应用中所有请求接口的模块
  每个函数返回值都是promise
*/
import ajax from './ajax'
// import axios from 'axios'


 //登陆接口
export function  reqLogin(data) {
  return ajax('/login',data,'POST')
}


//搜索导出接口
export function exportFile (url,data) {
  ajax(url, data,'POST',{
    // // 设置responseType对象格式为blob
    responseType: "blob"
    })
    .then( res => {
      console.log(res)
      // 创建下载的链接
      const url = window.URL.createObjectURL(new Blob ([res.data],{
        type: 'application/vnd.ms-excel;charset=utf-8'// 设置该文件的mime类型，这里对应的mime类型对应为.xlsx格式
      }));
          const link = document.createElement('a');
          link.href = url;
          // 从header中获取服务端命名的文件名
          const fileName =decodeURI(res.headers['content-disposition'] ? res.headers['content-disposition'].split('\'')[2] : '未命名');
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); // 下载完成移除元素
          window.URL.revokeObjectURL(url); // 释放掉blob对象
        })
}


/**此方法可导出文件，不仅仅限制于excel文件 */
// export function exportFile (url,param){
//     axios.post(url, param, {
//       responseType: 'blob'
//     }).then((res) => {
//       console.log('res', res);
//       const blob = res.data;
//       const reader = new FileReader();
//       reader.readAsDataURL(blob);
//       reader.onload = (e) => {
//         const a = document.createElement('a');
//         a.download = `文件名称.xlsx`;
//         // 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
//         a.href = e.target.result;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//       };
//     }).catch((err) => {
//       console.log(err.message);
//     });
// }

/*
5.实验管理模块
*/
//5.1.1 实验数据
export function expList (data) {
  return ajax('/experiment/data/info/list',data,'POST')
}
//5.1.2.1 得到所有实验人员
export function getExpPerson(){
  return ajax('/experiment/data/getTestPerson',{},'GET')
}

//5.1.2.2 得到所有试剂种类
export function getPaper(){
  return ajax('/experiment/data/getPaperType',{},'GET')
}
//5.1.2.3 根据试剂类型获取批号
export function getBathNum(data){
  return ajax('/experiment/data/getBathNumber',data,'POST')
}
//5.4.3 查看实验结果（根据id）
export function getExpRes(data){
  return ajax('/experiment/data/queryExpDataResult',data,'POST')
}
//5.4.4 查看实验结果里的实验详情（根据id）
export function getExpResDetail(data){
  return ajax('/experiment/data/queryExpDataDetail',data,'POST')
}
//5.4.5 查看实验计划（根据planid）
export function getExpPlan(data){
  return ajax('/experiment/data/queryTestPlan',data,'POST')
}

//5.1.2.3 根据试剂种类选择批号

//5.1.2.4添加实验数据
export function expDataAdd (data){
  return ajax('/experiment/data/addExpData',data,'POST')
}
//5.1.3 修改（修改实验计划相关信息，正在进行实验的计划无法修改）

//5.1.4删除（删除实验计划相关信息）
export function expDataDelete (data){
  return ajax('/experiment/data/deleteExpData',data,'POST')
}



//5.2.1 实验人员信息
export function expPersonList (data) {
  return ajax('/experimenter/list',data,'POST')
}
//5.2.2 添加实验人员
export function addExpPerson (data) {
  return ajax('/experimenter/add',data,'POST')
}
//5.2.3 修改
export function expPersonModify (data) {
  return ajax('/experimenter/update',data,'POST')
}
//5.2.4 删除
export function expDelete(data) {
  return ajax('/experimenter/delete',data,'POST')
}
//5.2.7 查看密码
export function checkPassword(data) {
  return ajax('/experimenter/pwd',data,'POST')
}

//5.3.1 设备测试
export function expDevTest(data) {
  return ajax('experiment/device/list',data,'POST')
}

//5.4.1 试剂测试
export function expRegTest(data) {
  return ajax('experiment/paperTest/info/list',data,'POST')
}
//5.4.2 查看历史设备信息
export function expRegDevTest(data) {
  return ajax('experiment/paperTest/queryDeviceHis',data,'POST')
}

/**
 * 家庭版统计模块
 */
//6.1测试数据
export function testDataHome(data) {
  return ajax('/testDataStatis/list',data,'POST')
}
//6.1.1 所有试剂类型和测试阶段 及对应id
export function testDataTypeIDHome() {
  return ajax('/allNameAndId',{},'GET')
}
//6.2 实际在测
export function actualTestHome(data) {
  return ajax('/realTest/list',data,'POST')
}
//6.3本周期漏测
export function missTestPeriodHome(data) {
  return ajax('/cyclePaperLeave/list',data,'POST')
}
//6.4在测用户
export function userInTestHome(data) {
  return ajax('/inTestUser/list',data,'POST')
}
//6.5新注册用户
export function newUserHome(data) {
  return ajax('/newRegUser/list',data,'POST')
}
//6.6新注册使用用户
export function newUseUsertHome(data) {
  return ajax('/newRegUseUser/list',data,'POST')
}
//6.7用户用药
export function userDrugHome(data) {
  return ajax('/userDrug/list',data,'POST')
}
//6.8所有用户
export function allUserHome(data) {
  return ajax('/allUser/list',data,'POST')
}
//6.9有效用户
export function effectUserHome(data) {
  return ajax('/allUser/allUserAndEffList',data,'POST')
}
//6.10 漏测用户
export function missTestHome(data) {
  return ajax('/paperLeaveNum/list',data,'POST')
}
// 6.11当前周期测试用户
export function testUserPeriodHome(data) {
  return ajax('/allUser/curCycTestUserList',data,'POST')
}

