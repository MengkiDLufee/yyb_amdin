//单位管理接口
import {loadData,modifyData,deleteData,addData} from "./common";

//加载数据&搜索数据
export function loadDataUnitManagement(params){
    return loadData('/unit/list',params)
}

//删除
export function deleteDataUnitManagement(params,currentPage,pageSize,total){
    return deleteData('/unit/delete',params)
        .then(response=>{
            if(response.data.code===1006){
                if((total-1)/pageSize<currentPage){
                    currentPage=Math.max(currentPage-1,0);
                }
                let param={
                    page:currentPage,
                    pageSize:pageSize,
                }
                return loadDataUnitManagement(param)
            }
            else{
                alert("删除失败，请稍后再试")
            }
        }).catch(err => {
            console.log(err);
        })
}

//修改
export function modifyDataUnitManagement(params,currentPage,pageSize){
    let p=modifyData('/unit/modify',params,currentPage,pageSize,'/unit/list');
    return p.then(res=>{
        return res[0]
    })
}

//添加
export function addDataUnitManagement(params,currentPage,pageSize){
    let p=addData('/unit/add',params,{page:currentPage,pageSize},'/unit/list');
    return p.then(res=>{
        return res
    })
}