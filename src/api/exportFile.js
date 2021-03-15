import httpRequest from "./http";

function exportFile(url,data,filename){
    httpRequest('get',url,data,{responseType: 'blob'})
        .then(response => {
            const link = document.createElement('a')
            let blob = new Blob([response.data],{type: 'application/vnd.ms-excel'});
            link.style.display = 'none';
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', `${filename}`+ '.xls');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(err => {
            console.log(err);
        })
}

export default exportFile;
