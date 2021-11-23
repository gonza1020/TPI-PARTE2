import {Property}from "./Property.js";
import { UI } from "./UI.js";

const d = document,
    $form = d.getElementById("propiedad-form");
// DOM Events

  $form.addEventListener("submit", function (e) {
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
    // Create a new UI instance
    const ui = new UI();

    // Input User Validation
    if (name === "" || price === "" || year === "") {
      ui.showMessage("Please Insert data in all fields", "danger");
    }

    // Save Product
    ui.addProduct(product);
    ui.showMessage("Product Added Successfully", "success");
    ui.resetForm();
  });

document.getElementById("product-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.deleteProduct(e.target);
  e.preventDefault();
});
