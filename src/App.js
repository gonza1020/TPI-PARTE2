import {Property}from "./Property.js";
import { UI } from "./UI.js";

class Inmobiliaria {
  newProperty (e,d) {
    e.preventDefault();
    const form = d.getElementById('propiedad-form')
    if(e.target === form){
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
      inm.addProperty(property);
    }
    
  }
   addProperty = async (property = {}) => { 
    try {
          const instance = axios.create({
            headers: {
                'Content-Type': 'application/json'
            }
            });
            let res = await instance.post(`http://localhost:3000/propiedades`,property)  
      } catch (error) {
        console.log(error.message)
    }finally { 
        llamarUI('/succes.html', 
        `<div class="modal-dialog">
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
          </div>`)
          alert('Registro confirmado')
    } 
  }
  async getProperties($fragment,$template,$dni){
    try {
      let res = await fetch ('http://localhost:3000/propiedades');
      let propiedades = await res.json();
      if (!res.ok) throw {error}
      if(!$dni){
        propiedades.forEach(c => {
          $template.querySelector('#tit-prop').textContent = c.nombre;
          $template.querySelector('#serv-prop').textContent = `Servicios: ${c.servicios}`;
          $template.querySelector('#disp-prop').innerHTML = `<strong>${c.disponibilidad}</strong>`;
          $template.querySelector('#dir-prop').textContent = `Ubicacion: ${c.ubicacion}`;
          $template.querySelector('#img-prop').src = c.multimedia;
  
          let $clone = d.importNode($template,true);
          $fragment.appendChild($clone)
      });
      }else{
        let cont = 0;
       
        propiedades.forEach(c => {
          
          if(c.propietario.DNI === parseInt($dni)){

            $template.querySelector('#tit-prop').textContent = c.nombre;
            $template.querySelector('#serv-prop').textContent = c.servicios;
            $template.querySelector('#disp-prop').textContent = c.disponibilidad;
            $template.querySelector('#dir-prop').textContent = c.ubicacion;
            $template.querySelector('#img-prop').src = "home/gonzalo/Escritorio/GIT/TPI-PARTE2/assets/casa2.jpeg";
            cont ++;
            let $clone = d.importNode($template,true);
            console.log($clone);
            $fragment.appendChild($clone)
          }
      });
      if(cont === 0 ){ 
        $body.removeChild(d.querySelector('.borrar'));
      } else  {
        let $div = d.createElement('div');
        $div.classList.add('borrar')
        $body.appendChild($div)
      }
      d.querySelector('.borrar').appendChild($fragment)
      
      }   
      $body.querySelector('.catalog-cards').appendChild($fragment)
    } catch (error) {
      console.log(error);
    }
  }
  async  buscarCliente(dniCliente){
    try {
      propietario = null;
      const $tabla = d.querySelector('.table');
      let res = await fetch ('http://localhost:3000/clientes');
      let clientes = await res.json();
      if (!res.ok) throw {error}
      clientes.forEach(c => {
        if (parseInt(dniCliente) === c.DNI) { 
          console.log('hola')
          propietario = c
        }
      });
      mostrarCliente(propietario,$tabla);
    } catch (error) {
      console.log(error)
    }
  }
}


const inm = new Inmobiliaria();
const d = document;
const $body = document.body;
const ui = new UI ();
let propietario
let idProp;

const llamarUI = (url,resp) => { 
  resp ? ui.getPage({url,success: (res)=> $body.innerHTML = `${res}${resp}` }) : ui.getPage({url,success: (res)=> $body.innerHTML = `${res}` });
  
}
const mostrarCliente = ($propietario,$tabla) => {
  ui.mostrarCliente($propietario,$tabla)
}
const mostrarCatalogo = () => { 
  ui.getPage({url:'https://gonza1020.github.io/TPI-PARTE2/src/catalog.html',success:(resp) => {
    $body.innerHTML = resp
    const $template = d.getElementById('card-prop').content,
    $fragment = d.createDocumentFragment();
    inm.getProperties($fragment,$template)
  } });
}


// DOM Events
d.addEventListener('click', e=> {
  if (e.target.matches('.cliente')) { 
    llamarUI('/https://gonza1020.github.io/TPI-PARTE2/src/form.html')
    console.log(propietario)

  }else if(e.target.matches('.client-search')){
    //inm.buscarCliente();
  }else if(e.target.matches('.c1-cliente')){
    console.log("Prueba ")
    llamarUI('https://gonza1020.github.io/TPI-PARTE2/src/cliente.html')
  }else if(e.target.matches('.catalog *')){
    mostrarCatalogo();  
  }else if(e.target.matches('.btn-search')){
    console.log('Buscador');
    llamarUI('https://gonza1020.github.io/TPI-PARTE2/src/propClient.html')
}else if(e.target.matches('.searchProp')){
    const $dni = d.querySelector('.search-client');
          const $template = d.getElementById('card-prop').content,
          $fragment = d.createDocumentFragment();
          console.log($dni.value);
          inm.getProperties($fragment,$template,$dni.value)
  }
})
d.addEventListener('keyup', async e=> {  
    e.preventDefault();
    const $input = d.querySelector('form input');
    if(e.target === $input){
      inm.buscarCliente($input.value);

    }  
})

d.addEventListener('DOMContentLoaded', e=>{
    //inm.getProperties()
    llamarUI('https://gonza1020.github.io/TPI-PARTE2/src/menu.html')
})

d.addEventListener("submit", e => { 
  inm.newProperty(e,d) 
  console.log(propietario)

});

