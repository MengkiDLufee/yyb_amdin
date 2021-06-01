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

/*
5.实验管理模块
*/
//5.1.1 实验数据
export function expList (data) {
  return ajax('/experiment/list',data,'POST')
}
//5.1.2.1 得到所有实验人员
export function getExpPerson(){
  return ajax('/experiment/get_test_people',{},'GET')
}

//5.1.2.2 得到所有试剂种类
export function getPaper(){
  return ajax('/experiment/get_paper_type',{},'GET')
}


//5.1.2.3 根据试剂种类选择批号

//5.1.2.4添加实验数据

//5.1.3 修改（修改实验计划相关信息，正在进行实验的计划无法修改）

//5.1.4删除（删除实验计划相关信息）



//5.2.1 实验人员信息
export function exp_person (data) {
  return ajax('/testperson/list',data,'POST')
}
