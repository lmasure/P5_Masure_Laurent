const queryString = window.location.search; //recuperation du contenu de la barre d'adresse
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");
console.log(productId);

const APIURL = `http://localhost:3000/api/teddies/${productId}`;
const productsDOM = document.querySelector("#products-center");

//connexion à l'API et affichage du detail de l'article
async function getProductDetails() {
  let response = await fetch(APIURL);
  if (response.ok) {
    let data = await response.json();
    let result = `
      <!-- single product -->
        <article class="product">
          <div class="img-container">
            <img src=${data.imageUrl} alt="product" class="product-img">
            <a class="product-btn" href=produit.html?id=${data._id}>
              <i class="fa fa-search"></i>
              Détail
            </a>
            <h3>${data.name}</h3>
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

getProductDetails();
