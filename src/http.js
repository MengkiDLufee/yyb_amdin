import axios from 'axios'
axios.defaults.baseURL = 'http://123.57.33.240:8080'
// axios.defaults.baseURL = 'http://java.xixibackup.me:8080'

function httpRequest(method, url, data, config){
    return new Promise((resolve ,reject)=>{
        method = method.toLowerCase();//字符串转为小写
        if(method==='post'){//获取数据
            let attribute={
                method:method,
                url:`${url}`,
                data:data,
                headers:{
                    'Content-Type':'application/json'
                }
            };
            axios(attribute).then(response=>{
                resolve(response);
            }).catch(err => {
                reject(err);
            });
        }
        else if (method==='get'){//导出文档
            let attribute={
                method:method,
                url:`${url}`,
                params:data,
                ...config,
            };
            axios(attribute).then(response=>{
                resolve(response);
            }).catch(err => {
                reject(err);
            })
        }
        else {
            let attribute={
                method:method,
                url:`${url}`,
                params:data,
                headers:{
                    'Content-Type':'application/json'
                },
            };
            axios(attribute).then(response=>{
                resolve(response);
            }).catch(err => {
                reject(err);
            })
        }
    })
}

export default httpRequest;