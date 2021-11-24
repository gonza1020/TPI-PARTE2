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
            console.log(xhr)
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
  
  mostrarCliente(cliente,$tabla) { 
    if(cliente){
      $tabla.querySelector(".client-table").rows[0].cells[0].innerHTML = `<p>${cliente.NombreApellido}</p>`
      $tabla.querySelector(".client-table").rows[0].cells[1].innerHTML = `<p>${cliente.DNI}</p>`
      $tabla.querySelector(".client-table").rows[0].cells[2].innerHTML = `<button type="button" class="btn cliente btn-primary">Seleccionar</button>`
    } else { 
      $tabla.querySelector(".client-table").rows[0].cells[0].innerHTML = `<p><b>CLIENTE NO ENCONTRADO</b></p>`
      $tabla.querySelector(".client-table").rows[0].cells[1].innerHTML = `<p>PRUEBE NUEVAMENTE</p>`
      $tabla.querySelector(".client-table").rows[0].cells[2].innerHTML = ``       
    }
    
  }
  
}
  
  