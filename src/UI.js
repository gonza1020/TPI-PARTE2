// UI Constructor
export class UI {
  
   getPage = (options) => { 
    let {url,success,error} = options
    this.url = url
    const xhr = new XMLHttpRequest(); 
    xhr.addEventListener('readystatechange', e=> {
        if(xhr.readyState !==4 ) return ; 

        if(xhr.status >=200 && xhr.status < 300) { 
            let reshtml = xhr.responseText
            success(reshtml)
            //console.log(xhr)
        }else { 
            let message = xhr.statusText || 'Eror'
            error (`Error: ${xhr.status}: ${message}`)
        }
    })
    xhr.open('GET',url); 
    xhr.setRequestHeader('Content-type' , 'text/html;charset=utf-8')
    xhr.send();
    
    }

  getUrl = () =>{
    return this.url
  }
  }
  
  
  
  