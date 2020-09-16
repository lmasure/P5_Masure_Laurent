
const orderAPI = "http://localhost:3000/api/teddies/order";
const order = JSON.parse(localStorage.getItem("order"));



async function resultOrder(){
  let response = await fetch(orderAPI);
  if (response.ok) {
    
    document.getElementById("firstName").innerHTML = order.contact.firstName;
    document.getElementById("lastName").innerHTML = order.contact.lastName;
  // Calculer le montant total de la commande
    let priceOrder = 0;
    let displayPrice = order.products;
    displayPrice.forEach((element) => {
      priceOrder += element.price / 100;
    });
    document.getElementById("priceOrder").innerHTML = priceOrder;
    document.getElementById("orderId").innerHTML = order.orderId;
  // Réinitialiser le localStorage, products, contact et redirection vers la page d'accueil
    // setTimeout(function () {
    //   localStorage.clear();
    //   let products = [];
    //   let contact;
    //   window.location = "./index.html";
    // }, 7000);



  } else {
    // Retirer le message d'ordre de commande si le localStorage ne contient pas l'item order
    let order = document.getElementById("order_result");
    order.remove();
    // Afficher un message d'erreur et rediriger l'utilisateur vers la page d'accueil
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
    }, 4500);
  }

}




resultOrder();