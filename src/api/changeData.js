import React from "react";
//根据表格内容进行内容替换
function changeData(data,origin,final){
    let text='';
    for(let i=0;i<origin.length;i++){
        //console.log(origin[i],data);
        if(data==origin[i])text=final[i];
    }
    return(
        <>
            {text}
        </>
    );
}
export default changeData;
