import { Product } from "./Product.js";
import { UI } from "./UI.js";

// DOM Events

const $body = document.body;

document.addEventListener('DOMContentLoaded', e=>{
  const ui = new UI(); 
  ui.getPage({url:'/cliente.html',
      success: (resp) => { 
        $body.innerHTML = resp;
      }  
});
})


document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    // Override the default Form behaviour
    e.preventDefault();

    // Getting Form Values
    const name = document.getElementById("name").value,
      price = document.getElementById("price").value,
      year = document.getElementById("year").value;

    // Create a new Oject Product
    const product = new Product(name, price, year);
    console.log(JSON.stringify(product))

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
