import httpRequest from "./http";

function exportFile(url,data,filename) {
     //return new Promise((resolve ,reject)=>{
        httpRequest('get',url,data,{responseType: 'blob'})
            .then(response => {
                console.log("收到",response);
                const link = document.createElement('a');
                console.log('link',link)
                let blob = new Blob([response.data],{type: 'application/vnd.ms-excel;charset=utf-8'});
                link.style.display = 'none';
                link.href = URL.createObjectURL(blob);//下载链接
                link.setAttribute('download', `${filename}`+ `.xlsx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
             })
            .catch(err => {
                console.log(err)
            })
   // })

}


export default exportFile;