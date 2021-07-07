//通用接口
import ajax from "../ajax"

//加载数据
export function loadData(url,params){
    var res=[];
    var currentPage=1;
    return ajax(url,params,'POST')
        .then(response=>{
            if(response.data!==[]) {
                const tempData=[...response.data.data.info];
                for(let i=0;i<tempData.length;i++){
                    tempData[i].key=(params.page-1)*params.pageSize+i;
                }
                res.push(tempData);
                res.push(response.data.data.total)
                res.push(currentPage)
            }
            return res
        }).catch(err => {
            console.log(err);
        })
}

//删除数据
export function deleteData(url,data){
    return ajax(url,data,'POST')
}

//修改数据
export function modifyData(modifyUrl,params,currentPage,pageSize,listUrl){
    return ajax(modifyUrl,params,'POST')
       .then(response=>{
            if(response.data.code===1004){
                const p=loadData(listUrl,{
                    page:currentPage,
                    pageSize:pageSize,
                });
                return p.then(res=>{
                    console.log(res)
                    return res;
                })
            }
        })
        .catch(err => {
            console.error(err);
        })
}

//添加数据
export function addData(addUrl,params,inital_params,listUrl){
    return ajax(addUrl,params,'POST')
        .then(response=>{
            if(response.data.code===1002){
                const p=loadData(listUrl,inital_params);
                return p.then(res=>{
                    console.log(res)
                    return res;
                })
            }
        })
        .catch(err => {
            console.error(err);
        })
}