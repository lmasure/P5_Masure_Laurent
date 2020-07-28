const APIURL = "http://localhost:3000/api/teddies";
const productsDOM = document.querySelector("#products-center");


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
            <button class="bag-btn" data-id=${product._id}>
              <i class="fas fa-shopping-cart"></i>
              ajouter au panier
            </button>
            <h3>${product.name}</h3>
          <h4>${product.price}€</h4>
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

