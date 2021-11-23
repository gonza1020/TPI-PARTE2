import {Property}from "./Property.js";
import { UI } from "./UI.js";

//variables
const d = document
const $body = d.body;
let propietario;


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
          propietario = c
        }

      });
      console.log(propietario)
      if (propietario) { 
        
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
  const ui = new UI(); 
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

    }

  });

