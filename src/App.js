import {Property}from "./Property.js";
import { UI } from "./UI.js";

//variables

const d = document
let propietario,
    idProp;
const $body = document.body,
      ui = new UI();

class Inmobiliaria 
{ 
   addProperty = async (property = {}) => { 
    try {
      const res = await fetch(`http://localhost:3000/propiedades`,
                  {   method:'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(property),
                      redirect: 'follow'
                  });
                  if(!res.ok) throw {status:res.status,message:res.statusText}   
  
      } catch (error) {
        console.log(error.message)
    }finally { 
      ui.getPage({url:'/succes.html',success:(resp)=> $body.innerHTML = `${resp} <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Domus 2.0</h5>
          </div>
        <div class="modal-body">
          PROPIEDAD CARGADA CON EXITO<br>
          <div>
          <p><b>Propiedad: ${property.getNombre()}</b></p> 
          <p><b>Ubicacion: ${property.ubicacion}</b></p> 
          <p><b>Telefono: ${property.telefono}</b></p> 
          <p><b>Propietario: ${property.propietario.NombreApellido}</b></p>
          <p><b>DNI: ${property.propietario.DNI}</b></p>
  </div>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>`})
  
    } 
  }
  async getProperties($fragment,$template){
    try {
      let res = await fetch ('http://localhost:3000/propiedades');
      let propiedades = await res.json();
      console.log(propiedades);
      if (!res.ok) throw {error}
      propiedades.forEach(c => {
          $template.querySelector('#tit-prop').textContent = c.nombre;
          $template.querySelector('#serv-prop').textContent = c.servicios;
          $template.querySelector('#disp-prop').textContent = c.disponibilidad;
          $template.querySelector('#dir-prop').textContent = c.ubicacion;
          $template.querySelector('#img-prop').src = "home/gonzalo/Escritorio/GIT/TPI-PARTE2/assets/casa2.jpeg";
  
          let $clone = d.importNode($template,true);
          console.log($clone);
          $fragment.appendChild($clone)
      });
      $body.appendChild($fragment)
      if (propietario) { 
         /* $tabla.insertAdjacentHTML('afterend',
        `<div>
          <p><mark>Nombre: ${cliente.NombreApellido}</mark></p>
          <p><mark>DNI: ${cliente.DNI}</mark></p>`)  */
  
        $tabla.querySelector(".client-table").rows[0].cells[0].innerHTML = `<p>${propietario.NombreApellido}</p>`
        $tabla.querySelector(".client-table").rows[0].cells[1].innerHTML = `<p>${propietario.DNI}</p>`
        $tabla.querySelector(".client-table").rows[0].cells[2].innerHTML = `<button type="button" class="btn cliente btn-primary">Seleccionar</button>`
      }
    } catch (error) {
      
    }
  }
  async  searchIcon(){
    try {
      const $tabla = d.querySelector('.table');
      const $input = d.querySelector('form input');
      let res = await fetch ('http://localhost:3000/clientes');
      let clientes = await res.json();
      if (!res.ok) throw {error}
      clientes.forEach(c => {
        if (parseInt($input.value) === c.DNI) { 
          propietario = c
        }
  
      });
      if (propietario) { 
         /* $tabla.insertAdjacentHTML('afterend',
        `<div>
          <p><mark>Nombre: ${cliente.NombreApellido}</mark></p>
          <p><mark>DNI: ${cliente.DNI}</mark></p>`)  */
  
        $tabla.querySelector(".client-table").rows[0].cells[0].innerHTML = `<p>${propietario.NombreApellido}</p>`
        $tabla.querySelector(".client-table").rows[0].cells[1].innerHTML = `<p>${propietario.DNI}</p>`
        $tabla.querySelector(".client-table").rows[0].cells[2].innerHTML = `<button type="button" class="btn cliente btn-primary">Seleccionar</button>`
      }
    } catch (error) {
      
    }
  }
}


const inm = new Inmobiliaria();

// DOM Events
d.addEventListener('click', e=> {
  if (e.target.matches('.cliente')) { 
    ui.getPage({url:'/form.html',success:(resp) => {$body.innerHTML = resp} })
  }else if(e.target.matches('.search-icon')){
    inm.searchIcon();
  }else if(e.target.matches('.c1-cliente *')){
    console.log("Prueba ")
    ui.getPage({url:'/cliente.html', success:(resp) => {$body.innerHTML = resp}})
  }else if(e.target.matches('.catalog *')){
    ui.getPage({url:'/catalog.html',success:(resp) => {
      $body.innerHTML = resp
      const $template = d.getElementById('card-prop').content,
            $fragment = d.createDocumentFragment();
            inm.getProperties($fragment,$template)
    } });

    
     // $fragment = d.createDocumentFragment();
        
  }
})
d.addEventListener('keypress', async e=> { 
  if (e.key == "Enter" ) { 
    e.preventDefault();
    inm.searchIcon();
  }
})

d.addEventListener('DOMContentLoaded', e=>{
    inm.getProperties()
    ui.getPage({url:'/menu.html',
      success: (resp) => { 
        $body.innerHTML = resp;
      }  
    })
  
})
d.addEventListener("submit", function (e) {
    e.preventDefault();
    if(e.target.matches('#propiedad-form')){
    // Override the default Form behaviour
    // Getting Form Values
    const name = d.getElementById("name").value,
      ubication = d.getElementById("ubication").value,
      tel = d.getElementById("tel").value,
      ant = d.getElementById("ant").value,
      services = d.getElementById("services").value,
      multi = d.getElementById("multi").value,
      type = d.getElementById("type").value,
      env = d.getElementById("env"),
      valueSelect = env.options[env.selectedIndex].value,
      prop = propietario
      let availability = 'Disponible';
      if(d.getElementById("exampleRadios2").checked == true){
          availability = 'No disponible';
      }
                idProp++;
                const property = new Property(idProp,name, ubication, tel,valueSelect,ant,services,multi,type,availability,prop);
                console.log(property.getPropietario().NombreApellido);
                console.log(idProp);
      inm.addProperty(property);
    }
    
});

