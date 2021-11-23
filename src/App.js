import {Property}from "./Property.js";
import { UI } from "./UI.js";

const d = document,
    $form = d.getElementById("propiedad-form");
// DOM Events

const $body = document.body;

document.addEventListener('DOMContentLoaded', e=>{
  const ui = new UI(); 
  ui.getPage({url:'/form.html',
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

    }

  });

