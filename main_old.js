//variables
const productSell = "teddies";
const APIURL = "http://localhost:3000/api/" + productSell;
const productsDOM = document.querySelector("#products-center");
//getting the products
class Products {
  getProducts() {
    fetch(APIURL)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
}
//show the products on index page
class UI {
  displayProducts() {
    let result = "";
    products.forEach((product) => {
      result += `
    <!-- single product -->
      <article class="product">
        <div class="img-container">
          <img src=${product.imageURL} alt="product" class="product-img">
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
}
// local storage
class storage {}
document.addEventListener("DOMContentLoaded", () => {
  // const ui = new UI();
  const products = new Products();
  //get all products
  products.getProducts().then((products) => ui.displayProducts(products));
});



// const cartBtn = document.querySelector(".cart-btn");
// const closeCartBtn = document.querySelector(".close-cart");
// const clearCartBtn = document.querySelector(".clear-cart");
// const cartDOM = document.querySelector(".cart");
// const cartOverlay = document.querySelector(".cart-overlay");
// const cartItems = document.querySelector(".cart-items");
// const cartTotal = document.querySelector(".cart-total");
// const cartContent = document.querySelector(".cart-content");
// let cart = [];
