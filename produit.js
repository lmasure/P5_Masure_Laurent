const queryString = window.location.search; //recuperation du contenu de la barre d'adresse
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

const APIURL = `http://localhost:3000/api/teddies/${productId}`;
const productsDOM = document.querySelector("#products-center");

class Product {
  constructor(id, name, description, imageUrl, price) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.number = 1;
  }
}

var product;

//connexion à l'API et affichage du detail de l'article
async function getProductDetails() {
  let response = await fetch(APIURL);
  if (response.ok) {
    let data = await response.json();
    product = new Product(
      data._id,
      data.name,
      data.description,
      data.imageUrl,
      data.price
    );
    let result = `
      <!-- single product -->
        <article class="product">
          <div class="img-container">
            <img src=${data.imageUrl} alt="product" class="product-img">
            <select name="teddies-select" id="teddies-select">
            <option value="">Choisissez la couleur</option>
            </select>
            <a id="buy-btn">
              <i class="fas fa-cart-arrow-down"></i>
              Achetez
            </a>
            <h3>${data.name}</h3>
            <p>${data.description}</p>
          <h4>${Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
          }).format(data.price / 100)}</h4>
          </div>
        </article>
        <!-- end of single product -->`;
    productsDOM.innerHTML = result;
  } else {
    console.error("Erreur de connexion à l'API : ", response.status);
  }
}
//fonction pour le choix des couleurs dans le menu deroulant
async function getColors() {
  let response = await fetch(APIURL);
  if (response.ok) {
    let data = await response.json();
    data.colors.forEach((color) => {
      let optionColor = document.createElement("option");
      document
        .getElementById("teddies-select")
        .appendChild(optionColor).innerHTML = color;
    });
  } else {
    console.error("Erreur de connexion à l'API : ", response.status);
  }
}

function addProduct() {
  // Mettre le produit dans le panier au clic
  document.body.addEventListener("click", async function (event) {
    if (event.srcElement.id == "buy-btn") {
      const productKey = "userBasket";
      let getItem = null;
      let products = [];

      // Je fais une condition pour voir si dans le localSTorage il existe une clé "userBasket"
      if (localStorage.getItem(productKey)) {
        // Si oui, j'ajoute la valeur de cette clé dans "getItem"
        getItem = JSON.parse(localStorage.getItem(productKey));
      }

      // Si getItem est faux alors je push dans mon tableau vide le produit en question
      if (getItem === null) {
        products.push(product);
      } else {
        // Sinon je copie mon localStorage dans mon tableau vide puis je push le nouveau produit
        products = getItem;
        const foundProduct = products.find(function (produit) {
          return produit.id === product.id;
        });
        // const foundProduct = products.find(element => element.id === product.id)
        if (foundProduct) {
          foundProduct.number += 1;
        } else {
          products.push(product);
        }
      }

      // Puis l'action pour ajouter dans mon localstorage le tableau
      localStorage.setItem(productKey, JSON.stringify(products));

      // Notifier l'utilisateur de l'ajout au panier
      setTimeout(function () {
        document.getElementById(
          "add-text"
        ).textContent = `Vous avez ajouté ${product.name} à votre panier !`;
      }, 500);
      // function add_done_remove() {
      //   document.getElementById("add-text").textContent = "";
      // }
      // window.setTimeout(add_done_remove, 2000);
    }
  });
}

//appel des fonctions
getProductDetails();
getColors();
addProduct();
