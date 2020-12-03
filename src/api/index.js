//根据接口文档定义接口函数
//包含应用中所有请求接口的模块
//每个函数返回值都是promise
import ajax from './ajax'


 //登陆接口
export function  reqLogin(username,password) {
  return ajax('/login',{username,password},'POST')
}


//搜索导出接口
export function exportFile (url,data) {
   ajax(url, {data,
    // 设置responseType对象格式为blob
    responseType: "blob"
    },'POST')
    .then( res => {
      console.log(res)
      // 创建下载的链接
      const url = window.URL.createObjectURL(new Blob([res.data],{
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'// 设置该文件的mime类型，这里对应的mime类型对应为.xlsx格式   
      }));
          const link = document.createElement('a');
          link.href = url;
          // 从header中获取服务端命名的文件名
          const fileName =decodeURI(res.headers['content-disposition'].split('\'')[2]);
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
    })
}