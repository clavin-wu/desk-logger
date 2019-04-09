let arr1=[];
//转换具体时间
function getLocalTime(nS) {     
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
 }
function add(lelve,arr) {
    contentMessage.innerHTML='';
   if(arr){
     arr1=arr;
     addContent(arr,lelve)
   }else {
     addContent(arr1,lelve)
   }
}
//添加内容  
function addContent(arr){
    arr.forEach(function(item,key){
        if(item.lelve==lelve){
            let str = document.createElement('p');
            str.innerHTML = `<h4>级别：${item.lelve}</h4>`+`<p>message：${JSON.stringify(item.message)}</p>`+`<p>时间：${getLocalTime(item.date)}</p>`;
            contentMessage.appendChild(str); 
        }
     })
}
module.exports={
    add 
}