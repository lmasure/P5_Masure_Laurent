// const { get, connect } = require("mongoose");

const APIURL = "http://localhost:3000/api/teddies";
const productsDOM = document.querySelector("#products-center");

//connexion à l'API et affichage des objets dans la page index
async function getTeddies() {
  let response = await fetch(APIURL);
  //condition pour tester que les données de l'API sont bien reçues
  if (response.ok) {
    let data = await response.json();
    let result = "";
    data.forEach(function (product) {
      result += `
        <div class="col-md-6 col-lg-4 mb-5">
        <a href=produit.html?id=${product._id}>
            <div class="portfolio-item mx-auto">
           
                <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                    <div class="portfolio-item-caption-content text-center text-white"><i class="fa fa-search fa-3x"></i></div>
                </div>
              <img class="img-fluid" src=${
                product.imageUrl
              } alt="product image" class="product-img">
        </a>
        <h3 class="card-title text-center">${product.name}</h3>
        <h4 class="card-title text-center">${Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(product.price / 100)}</h4>
          </div>
          
        </div>
      `;
    });
    productsDOM.innerHTML = result;
  } else {
    console.error("Erreur de connexion à l'API : ", response.status);
  }
}

getTeddies();

// Affichage du nombre d'articles dans le header

// const cartCountElement =  document.getElementById('cart-items');

// let cartCount = 0;
// const cartJSON = localStorage.getItem("cart");
// const cart =  JSON.parse(cartJSON);
// cart.forEach((product) => {
// cartCount += product.number;
// });
// cartCountElement.innerText = cartCount;


// AFFICHAGE DU NOMBRE D'ARTICLES DANS LE HEADER
function showCartCount() {
  const cartCountElement = document.getElementById("cart-items");
  let cartCount = 0;
  const cartJSON = localStorage.getItem("cart");
  if ((cart = JSON.parse(cartJSON))) {
    cart.forEach((product) => {
      cartCount += product.number;
    });
    cartCountElement.innerText = cartCount;
  }
}
showCartCount();