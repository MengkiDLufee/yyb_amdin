function addKey(data){
    for( let i=0;i<data.length;i++){
        data[i].key=i;
    }
    return(data);
}
export default addKey;
