function request(i){return new Promise((o,n)=>{const{url:e,data:r={},method:t="GET"}=i;i.url||n(new Error("Url 不存在"));const a=new FormData;for(var l in r)a.append(l,r[l]);const s=new XMLHttpRequest;s.onreadystatechange=function(){200===s.status&&4===s.readyState&&o(s.response)},s.onerror=function(){n(new Error("请求不到"+e+"的文件"))},s.open(t.toUpperCase(),e),s.responseType="blob",s.send(a)})}const blobToBase64=function(r){return new Promise((n,o)=>{const e=new FileReader;e.onload=o=>{n(o.target.result)},e.readAsDataURL(r),e.onerror=()=>{o(new Error("文件流异常"))}})},urlToBase64=function(o){o=o.split(",");return atob(o[1])},urlToBlob=function(o){const n=o.split(",");var e=n[0].match(/:(.*?);/)[1],o=n[1];return base64ToBlob({o:o,contentType:e})},base64ToBlob=function({b64Data:s="",contentType:i="",sliceSize:c=512,name:u=""}){return new Promise((o,n)=>{try{const r=atob(s),t=[];for(let o=0;o<r.length;o+=c){const a=r.slice(o,o+c),l=[];for(let o=0;o<a.length;o++)l.push(a.charCodeAt(o));t.push(new Uint8Array(l))}var e=new Blob(t,{type:i});o(e=Object.assign(e,{t:URL.createObjectURL(e),name:u}))}catch(o){n(new Error("base64 错误"))}})},isValidString=o=>!!o&&"string"==typeof o,imageUrlToBase64=function(r){return new Promise((n,o)=>{const e=new Image;e.onload=function(){const o=document.createElement("canvas");o.width=this.naturalWidth,o.height=this.naturalHeight,o.getContext("2d").drawImage(e,0,0),n(o.toDataURL())},e.setAttribute("crossOrigin","Anonymous"),e.src=r,e.onerror=()=>{o(new Error("图片流异常"))}})},fileUrlToUrl=function(o){return new Promise((n,e)=>{try{request({url:o}).then(o=>{n(URL.createObjectURL(o))}).catch(o=>{e(o)})}catch(o){e(new Error("请求不到文件"))}})},downloadFile=async function(o,n){o=await fileUrlToUrl(o);toDownload(o,n)},toDownload=(o,n)=>{const e=document.createElement("a");e.href=o,e.download=n,e.click(),e.remove()};export{blobToBase64,urlToBase64,urlToBlob,base64ToBlob,fileUrlToUrl,downloadFile,toDownload};