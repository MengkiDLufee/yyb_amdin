//测试集接口
import {loadData,modifyData,deleteData,addData} from "./common";

//加载数据&搜索数据
export function loadDataTestSet(params){
    return loadData('/test/list',params)
}

//删除
export function deleteDataTestSet(params,currentPage,pageSize,total){
    return deleteData('/test/remove',params)
        .then(response=>{
            if(response.data.code===1006){
                if((total-1)/pageSize<currentPage){
                    currentPage=Math.max(currentPage-1,0);
                }
                let param={
                    page:currentPage,
                    pageSize:pageSize,
                }
                return loadDataTestSet(param)
            }
            else{
                alert("无法删除与当前测试集有关的数据！")
            }
        }).catch(err => {
        console.log(err);
    })
}

//修改
export function modifyDataTestSet(params,currentPage,pageSize){
    let p=modifyData('/test/modify',params,currentPage,pageSize,'/test/list');
    return p.then(res=>{
       return res[0]
    })
}

//添加
export function addDataTestSet(params,currentPage,pageSize){
    let p=addData('/test/add',params,{page:currentPage,pageSize},'/test/list');
    return p.then(res=>{
        return res
    })
}