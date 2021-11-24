import {Property}from "./Property.js";
import { UI } from "./UI.js";

class Inmobiliaria {
  newProperty (propiedad) {
    let {name,ubic,tel,ant,serv,multi,type,valueSelect,radio} = propiedad
    
    // Override the default Form behaviour
    // Getting Form Values
      let prop = propietario
      let availability = 'Disponible';
      if(radio == true){
          availability = 'No disponible';
      }
      idProp++;
      const property = new Property(idProp,name, ubic, tel,valueSelect,ant,serv,multi,type,availability,prop);
      inm.addProperty(property);
    
    
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

        ui.getPropiedades(propiedades,$template,$fragment)

      }else{
        let cont = 0;
       
        propiedades.forEach(c => {
          
          if(c.propietario.DNI === parseInt($dni)){

            $template.querySelector('#tit-prop').textContent = c.nombre;
            $template.querySelector('#serv-prop').textContent = c.servicios;
            $template.querySelector('#disp-prop').textContent = c.disponibilidad;
            $template.querySelector('#dir-prop').textContent = c.ubicacion;
            $template.querySelector('#img-prop').setAttribute("src","https://placeimg.com/640/480/arch");

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
  ui.getPage({url:'/catalog.html',success:(resp) => {
    $body.innerHTML = resp
    const $template = d.getElementById('card-prop').content,
    $fragment = d.createDocumentFragment();
    inm.getProperties($fragment,$template)
  } });
}

// DOM Events
d.addEventListener('click', e=> {
  if (e.target.matches('.cliente')) { 
    llamarUI('/form.html')
    console.log(propietario)

  }else if(e.target.matches('.client-search')){
    inm.buscarCliente();
  }else if(e.target.matches('.c1-cliente')){
    console.log("Prueba ")
    llamarUI('/cliente.html')
  }else if(e.target.matches('.catalog *')){
    mostrarCatalogo();  
  }else if(e.target.matches('.btn-search')){
    console.log('Buscador');
    llamarUI('/propClient.html')
}else if(e.target.matches('.searchProp')){
    const $dni = d.querySelector('.search-client');
          const $template = d.getElementById('card-prop').content,
          $fragment = d.createDocumentFragment();
          console.log($dni.value);
          inm.getProperties($fragment,$template,$dni.value)
  }else if (e.target.matches('.back-btn')) {
    if (ui.getUrl() == '/catalog.html' || ui.getUrl() == '/propClient.html' || ui.getUrl() == '/cliente.html') {
      llamarUI('/menu.html')
    };
    if (ui.getUrl() == '/form.html' ){
      llamarUI('/cliente.html')
    }
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
    inm.getProperties()
    llamarUI('/menu.html')
})

d.addEventListener("submit", e => { 
  e.preventDefault()
  const form = d.getElementById('propiedad-form')
  if(e.target === form){
  let env = d.getElementById("env");
  let property = {
    name : d.getElementById("name").value,
    ubic : d.getElementById("ubication").value,
    tel : d.getElementById("tel").value,
    ant : d.getElementById("ant").value,
    serv: d.getElementById("services").value,
    multi : d.getElementById("multi").value,
    type : d.getElementById("type").value,
    valueSelect : env.options[env.selectedIndex].value,
    radio: d.getElementById("exampleRadios2").checked
  }
  inm.newProperty(property) 
  }
});

