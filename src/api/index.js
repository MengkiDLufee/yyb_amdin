/*
  根据接口文档定义接口函数
  包含应用中所有请求接口的模块
  每个函数返回值都是promise
*/
import ajax from './ajax'
// import axios from 'axios'


 //登陆接口
export function  reqLogin(username,password) {
  return ajax('/login',{username,password},'POST')
}


//导出接口(可用于按条件搜索和选择搜索)
export function exportFile (url,data) {
  ajax(url, data,'POST',{
    // // 设置responseType对象格式为blob
    responseType: "blob"
    })
    .then( res => {
      console.log(res)
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

/**
 * 4.设备管理模块
 */
//4.1 设备信息（含搜索功能）
export function devList(data) {
  return ajax('/device/manage/info/list',data,'POST')
}
//4.4 修改设备信息
export function devModify(data) {
  return ajax('/device/manage/info/modify',data,'POST')
}
//4.5 添加设备信息
export function devAdd(data) {
  return ajax('/device/manage/info/add',data,'POST')
}
//4.6 查询设备的历史使用人员
export function devHistoryUser(data) {
  return ajax(`/device/manage/history/user/list/${data.deviceId}/${data.page}/${data.pageSize}`,{},'GET')
}
//4.7 删除设备
export function devDelete(deviceId) {
  return ajax(`/device/manage/info/remove/${deviceId}`,{},'GET')
}



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


//5.1.2.3 根据试剂种类选择批号

//5.1.2.4添加实验数据

//5.1.3 修改（修改实验计划相关信息，正在进行实验的计划无法修改）

//5.1.4删除（删除实验计划相关信息）



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

