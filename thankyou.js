const orderDetailJson = localStorage.getItem("order");
const orderDetail = JSON.parse(orderDetailJson);

let thankyouMsg = document.getElementById('thk-txt');
thankyouMsg.innerText = "Merci pour votre commande" + `<br>` + "vous allez être redirigé sur la page d'accueil";
function Redirect() {
  window.location = "http://127.0.0.1:5500/index.html";
}


// window.setTimeout('Redirect()', 3000);