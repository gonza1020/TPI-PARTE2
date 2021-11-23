import {Property}from "./Property.js";
import { UI } from "./UI.js";

const d = document
// DOM Events

const $body = document.body;

d.addEventListener('keypress', async e=> { 
  if (e.key == "Enter" ) { 
    e.preventDefault();
    try {
      let cliente = null;
      const $div = d.querySelector('.container-buscador')
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
        $div.insertAdjacentHTML('afterend',`<p><mark>Nombre: ${cliente.NombreApellido}</mark></p>
        <p><mark>DNI: ${cliente.DNI}</mark></p>`)
      }
    } catch (error) {
      
    }
  }

})

document.addEventListener('DOMContentLoaded', e=>{
  const ui = new UI(); 
  ui.getPage({url:'./cliente.html',
      success: (resp) => { 
        $body.innerHTML = resp;
      }  
});
})
  d.addEventListener("submit", function (e) {
    // Override the default Form behaviour
    if(e.target.matches('#propiedad-form')){ 
      e.preventDefault();
      const $form = e.target;
      const name = $form.getElementById("name").value,
      ubication = $form.getElementById("ubication").value,
      tel = $form.getElementById("tel").value,
      ant = $form.getElementById("ant").value,
      services = $form.getElementById("services").value,
      multi = $form.getElementById("multi").value,
      type = $form.getElementById("type").value,
      env = $form.getElementById("env"),
      valueSelect = env.options[env.selectedIndex].value;
      let availability = 'Disponible';

      if($form.getElementById("exampleRadios2").checked == true){
          availability = 'No disponible';
      }
    // Create a new Oject Product
    const property = new Property(name, ubication, tel,valueSelect,ant,services,multi,type,availability);
    console.log(property);
    }

    // Getting Form Values
    
    // Create a new UI instance
    /*const ui = new UI();

    // Input User Validation
    if (name === "" || price === "" || year === "") {
      ui.showMessage("Please Insert data in all fields", "danger");*/
    //}

    // Save Product
    //ui.addProduct(product);
    //ui.showMessage("Product Added Successfully", "success");
    //ui.resetForm();
  });

/*document.getElementById("product-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.deleteProduct(e.target);
  e.preventDefault();
});*/
