import {Property}from "./Property.js";
import { UI } from "./UI.js";

const d = document
// DOM Events

const $body = document.body,
      ui = new UI();

d.addEventListener('keypress', async e=> { 
  if (e.key == "Enter" ) { 
    e.preventDefault();
    try {
      let cliente = null
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
          cliente = c
        }

      });
      console.log(cliente)
      if (cliente) { 
        
         /* $tabla.insertAdjacentHTML('afterend',
        `<div>
          <p><mark>Nombre: ${cliente.NombreApellido}</mark></p>
          <p><mark>DNI: ${cliente.DNI}</mark></p>`)  */

        $tabla.querySelector(".client-table").rows[0].cells[0].innerHTML = `<p>${cliente.NombreApellido}</p>`
        $tabla.querySelector(".client-table").rows[0].cells[1].innerHTML = `<p>${cliente.DNI}</p>`
        $tabla.querySelector(".client-table").rows[0].cells[2].innerHTML = `<button type="button" class="btn btn-primary">Seleccionar</button>`
      }
    } catch (error) {
      
    }
  }

})

document.addEventListener('DOMContentLoaded', e=>{
  ui.getPage({url:'/cliente.html',
      success: (resp) => { 
        $body.innerHTML = resp;
      }  
});
})

  d.addEventListener("submit", function (e) {
    if(e.target.matches('#propiedad-form')){
          // Override the default Form behaviour
    e.preventDefault();

    // Getting Form Values
    const name = d.getElementById("name").value,
      ubication = d.getElementById("ubication").value,
      tel = d.getElementById("tel").value,
      ant = d.getElementById("ant").value,
      services = d.getElementById("services").value,
      multi = d.getElementById("multi").value,
      type = d.getElementById("type").value,
      env = d.getElementById("env"),
      valueSelect = env.options[env.selectedIndex].value;
      let availability = 'Disponible';

      if(d.getElementById("exampleRadios2").checked == true){
          availability = 'No disponible';
      }
                // Create a new Oject Product
                const property = new Property(name, ubication, tel,valueSelect,ant,services,multi,type,availability);
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
                  </div>
                          </div>
                          <div class="modal-footer">
                          </div>
                        </div>
                      </div>`)

                  
                         

    }
    
  });

