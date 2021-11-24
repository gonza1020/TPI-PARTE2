// UI Constructor
const d = document;
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
            let message = xhr.statusText || 'Error'
            //error (`Error: ${xhr.status}: ${message}`)
        }
    })
    xhr.open('GET',url); 
    xhr.setRequestHeader('Content-type' , 'text/html;charset=utf-8')
    xhr.send();
    
    }
    getPropiedades = (propiedades,$template,$fragment,$dni) => {
      
        propiedades.forEach(c => {
          $template.querySelector('#tit-prop').textContent = c.nombre;
          $template.querySelector('#serv-prop').textContent = c.servicios
          $template.querySelector('#disp-prop').innerHTML = c.disponibilidad
          $template.querySelector('#dir-prop').textContent = c.ubicacion
          $template.querySelector('#img-prop').setAttribute("src","https://placeimg.com/640/480/arch");
          let $clone = d.importNode($template,true);
          $fragment.appendChild($clone)
        });
    };
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
  
  