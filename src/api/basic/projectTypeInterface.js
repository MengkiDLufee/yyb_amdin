import {loadData,modifyData,deleteData,addData} from "./common";

//加载数据&搜索数据
export function loadDataProjectType(params){
    return loadData('/plan/list',params)
}

//删除
export function deleteDataProjectType(params,currentPage,pageSize,total){
    return deleteData('/plan/delete',params)
        .then(response=>{
            if(response.data.code===1006){
                if((total-1)/pageSize<currentPage){
                    currentPage=Math.max(currentPage-1,0);
                }
                let param={
                    page:currentPage,
                    pageSize:pageSize,
                }
                return loadDataProjectType(param)
            }
            else if(params.planTypeId){
                alert("删除失败，请稍后再试")
            }
            else{
                alert("无法删除与当前测试集有关的数据！")
            }
        }).catch(err => {
            console.log(err);
        })
}

//修改
export function modifyDataProjectType(params,currentPage,pageSize){
    let p=modifyData('/plan/modify',params,currentPage,pageSize,'/plan/list');
    return p.then(res=>{
        return res[0]
    })
}

//添加
export function addDataProjectType(params,currentPage,pageSize){
    let p=addData('/plan/add',params,{page:currentPage,pageSize},'/plan/list');
    return p.then(res=>{
        return res
    })
}