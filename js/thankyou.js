const orderAPI = "http://localhost:3000/api/teddies/order";
const order = JSON.parse(localStorage.getItem("order"));




function resultOrder() {

  if (localStorage.getItem("order") != null) {
    // Afficher un message de remerciement pour l'utilisateur
    let order = JSON.parse(localStorage.getItem("order"));
    let products = JSON.parse(localStorage.getItem("cart"));

    let orderId = localStorage.getItem("orderId");
    document.getElementById("firstName").innerHTML = order.contact.firstName;
    document.getElementById("lastName").innerHTML = order.contact.lastName;
    // Calculer le montant total de la commande
    let priceOrder = 0;
    products.forEach((element) => {
      priceOrder += element.price / 100;
    });
    document.getElementById("priceOrder").innerHTML = priceOrder;
    document.getElementById("orderId").innerHTML = orderId;
    localStorage.clear();
    setTimeout(function () {
      window.location = "./index.html";
    }, 2500);
  } else {
    let resultCommand = document.getElementById("confirmation_commande");
    let resultCommandError = document.createElement("div");
    resultCommandError.setAttribute("id", "order_result_error");
    let iconError = document.createElement("i");
    iconError.setAttribute("class", "fas fa-exclamation-triangle fa-5x");
    iconError.setAttribute("id", "error_logo");
    let messageError = document.createElement("p");
    messageError.innerHTML =
      "Aucune commande passée, vous êtes arrivé(e) ici par erreur !";
    resultCommand.appendChild(resultCommandError);
    resultCommandError.appendChild(iconError);
    resultCommandError.appendChild(messageError);
    setTimeout(function () {
      window.location = "./index.html";
    }, 2500);
  }
};

function checkLocalStorage() {
  if (localStorage.getItem("order") == null) {
    console.log("Le localStorage à bien été vidé")
}};

resultOrder();
checkLocalStorage();