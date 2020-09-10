const orderDetailJson = localStorage.getItem("order");
const orderDetail = JSON.parse(orderDetailJson);
const idCommande = orderDetail._id;
// console.log(orderDetail);
let thankyouMsg = document.getElementById('thk-txt');

thankyouMsg.innerText = "Merci pour votre commande n°" + idCommande + " ,vous allez être redirigé sur la page d'accueil";
function Redirect() {
  window.location = "http://127.0.0.1:5500/index.html";
}

// localStorage.clear();
// console.log(localStorage);
// window.setTimeout('Redirect()', 3000);