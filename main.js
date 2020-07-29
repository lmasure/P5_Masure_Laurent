const APIURL = "http://localhost:3000/api/teddies";
const productsDOM = document.querySelector("#products-center");

//connexion à l'API et affichage des objets dans la page index
async function getTeddies() {
  let response = await fetch(APIURL);
  if(response.ok){
    let data = await response.json();
    let result = "";
      data.forEach((product) => {
        result += `
      <!-- single product -->
        <article class="product">
          <div class="img-container">
            <img src=${product.imageUrl} alt="product" class="product-img">
            <button class="product-btn" data-id=${product._id}>
              <i class="fa fa-search"></i>
              Détail
            </button>
            <h3>${product.name}</h3>
          <h4>${Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price/100)}</h4>
          </div>
        </article>
        <!-- end of single product -->`;
      });
      productsDOM.innerHTML = result;
  }
  else{
    console.error('Erreur de connexion à l\'API');
  }
};
getTeddies();

