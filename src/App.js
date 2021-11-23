import {Property}from "./Property.js";
import { UI } from "./UI.js";

//variables
const d = document
let propietario;
const $body = document.body,
      ui = new UI();

// DOM Events
localStorage.setItem('post','NO')

const addProperty = async (property = {}) => { 
  try {
    const res = await fetch(`http://localhost:3000/propiedades`,
                {   method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(property)
                });
                const datos =  await res.json();
                if(!res.ok) throw {status:res.status,message:res.statusText}   
                localStorage.setItem('post','SI')
                location.reload();
              }   catch (error) {
      console.log(error.message)
  } 
}
d.addEventListener('click', e=> {
  if (e.target.matches('.cliente')) { 
    ui.getPage({url:'/form.html',success:(resp) => {$body.innerHTML = resp} }
    )
    localStorage.setItem('post','NO')
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
      console.log(clientes)
      console.log($input.value)
      clientes.forEach(c => {
        console.log(typeof $input.value)
        if (parseInt($input.value) === c.DNI) { 
          propietario = c
        }});
      console.log(propietario)
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

window.addEventListener('load', e=>{
  if (window.localStorage.getItem('post') === 'NO') { 
    ui.getPage({url:'/cliente.html',
      success: (resp) => { 
        $body.innerHTML = resp;
      }  
    })
  } else { 
    ui.getPage({url:'/succes.html',
    success: (resp) => { 
      $body.innerHTML = resp;
      }  
    })
  }
  ;
})

  d.addEventListener("submit", function (e) {
    if(e.target.matches('#propiedad-form')){
          // Override the default Form behaviour
      e.preventDefault();
      e.stopPropagation();
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
                // Create a new Oject Product
                const property = new Property(name, ubication, tel,valueSelect,ant,services,multi,type,availability,prop);
                console.log(property);
                console.log(multi);
                  $body.insertAdjacentHTML('beforeend',`
                  <div class="modal-dialog">
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
                      </div>`)
        addProperty(property)
    }
    
  });

