import {loadData,modifyData,deleteData,addData} from "./common";

//加载数据&搜索数据
export function loadDataTestType(params){
    return loadData('/test/type/list',params)
}