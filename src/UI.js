// UI Constructor
export class UI {
  
   getPage = (options) => { 
    let {url,success,error} = options
    const xhr = new XMLHttpRequest(); 
    xhr.addEventListener('readystatechange', e=> {
        if(xhr.readyState !==4 ) return ; 

        if(xhr.status >=200 && xhr.status < 300) { 
            let reshtml = xhr.responseText
            success(reshtml)
            console.log(xhr)
        }else { 
            let message = xhr.statusText || 'Eror'
            error (`Error: ${xhr.status}: ${message}`)
        }
    })
    xhr.open('GET',url); 
    xhr.setRequestHeader('Content-type' , 'text/html;charset=utf-8')
    xhr.send();
    
    }
    mostrarCliente(cliente,$tabla) { 
      if(cliente){
        $tabla.querySelector(".client-table").rows[0].cells[0].innerHTML = `<p>${cliente.NombreApellido}</p>`
        $tabla.querySelector(".client-table").rows[0].cells[1].innerHTML = `<p>${cliente.DNI}</p>`
        $tabla.querySelector(".client-table").rows[0].cells[2].innerHTML = `<button type="button" class="btn cliente btn-primary">Seleccionar</button>`
      } else { 
        $tabla.querySelector(".client-table").rows[0].cells[0].innerHTML = `<p><b>CLIENTE NO ENCONTRADO</b></p>`
        $tabla.querySelector(".client-table").rows[0].cells[1].innerHTML = `<p>PRUEBE NUEVAMENTE</p>`
        $tabla.querySelector(".client-table").rows[0].cells[2].innerHTML = ``       
      }
      
    }
  
}
  
  
  // Add a new Product
  /*addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product</strong>: ${product.name} -
                    <strong>Price</strong>: ${product.price} - 
                    <strong>Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
    productList.appendChild(element);
  }

  resetForm() {
    document.getElementById("product-form").reset();
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.remove();
      this.showMessage("Product Deleted Succsssfully", "success");
    }
  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));

    // Show in The DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");

    // Insert Message in the UI
    container.insertBefore(div, app);

    // Remove the Message after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }*/