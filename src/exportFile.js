import httpRequest from "./http";

function exportFile(url,data,filename){
     return new Promise((resolve ,reject)=>{
        httpRequest('get',url,data,{responseType: 'blob'})
            .then(response => {
                console.log("收到",response);
                const link = document.createElement('a')
                let blob = new Blob([response.data],{type: 'application/vnd.ms-excel'});
                link.style.display = 'none';
                link.href = URL.createObjectURL(blob);
                link.setAttribute('download', `${filename}`+ '.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                 resolve(response)
             })
            .catch(err => {
                reject(err);
            })
    })

}

export default exportFile;