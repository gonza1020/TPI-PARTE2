import {Property}from "./Property.js";
import { UI } from "./UI.js";

//variables
const d = document
let propietario,
    idProp;
const $body = document.body,
      ui = new UI();


// DOM Events

const addProperty = async (form,property = {}) => { 
  try {
    var form = new FormData()
    const res = await fetch(`http://localhost:3000/propiedades`,
                {   method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: form,
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
        <p><b>Propiedad: ${property.nombre}</b></p> 
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
d.addEventListener('click', e=> {
  if (e.target.matches('.cliente')) { 
    ui.getPage({url:'/form.html',success:(resp) => {$body.innerHTML = resp} }
    )
  }
})
d.addEventListener('keypress', async e=> { 
  if (e.key == "Enter" ) { 
    e.preventDefault();
    try {
      const $tabla = d.querySelector('.table')
      const $input = d.querySelector('form input')
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

})
d.addEventListener('DOMContentLoaded', async e =>{
  try {
    let resProp = await fetch ('http://localhost:3000/propiedades');
    let propiedades = await resProp.json();
    idProp = propiedades.length
  } catch (error) {
    console.log(error)
  }
})

document.addEventListener('DOMContentLoaded', e=>{
    ui.getPage({url:'/cliente.html',
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
                // Create a new Oject Product
                const property = new Property(idProp,name, ubication, tel,valueSelect,ant,services,multi,type,availability,prop);
                console.log(property);
                console.log(multi);
        addProperty(d.getElementById('propiedad-form'),property)
    }
    
  });

