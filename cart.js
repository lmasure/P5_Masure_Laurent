const userBasketJson = localStorage.getItem("userBasket");
const userBasket = JSON.parse(userBasketJson);

const checkBasket = function () {
  // Vérifier que le panier contient un/des produit(s)
  if (localStorage.length === 0) {
    alert("Votre panier est vide !");
    document.location.href = "http://127.0.0.1:5500/index.html";
  }
};

const ligneProduit = function () {
  for (let i in userBasket) {
    const factureSection = document.getElementById("facture");
    const ligneTableau = factureSection.insertRow(1);
    const colonneNomProduit = ligneTableau.insertCell(0);
    const colonnePrixUnitaire = ligneTableau.insertCell(1);
    const quantProduit = ligneTableau.insertCell(2);
    const totalProduit = ligneTableau.insertCell(3);
    const suppProduit = ligneTableau.insertCell(4);

    // Attribuer les classes
    colonneNomProduit.setAttribute("id", "nomProduit");
    colonnePrixUnitaire.setAttribute("id", "prixUnitProduit");
    quantProduit.setAttribute("id", "nbProduit");
    totalProduit.setAttribute("id", "totalUnitaire");
    suppProduit.setAttribute("class", "fas fa-trash-alt removeProduct");
    suppProduit.setAttribute("id", "removeProduct");
    // Remplir le contenu des balises
    const nomProduit = document.getElementById("nomProduit");
    const prixUnitProduit = document.getElementById("prixUnitProduit");
    const nbProduit = document.getElementById("nbProduit");
    const cellTotalU = document.getElementById("totalUnitaire");
    const removeProduit = document.getElementById("removeProduct");
    removeProduit.addEventListener("click", removeProduct.bind(i));
    nomProduit.innerHTML = [userBasket[i].name];
    prixUnitProduit.textContent = [userBasket[i].price] / 100 + " €";
    nbProduit.textContent = [userBasket[i].number];
    cellTotalU.textContent =
      ([userBasket[i].number] * [userBasket[i].price]) / 100 + " €";
  }
};

const totalFacture = function () {
  let quantTeddies = 0;
  let teddiesPrice = 0;
  let totalFact = 0;
  let totalQuant = document.getElementById("total_qut");
  userBasket.forEach((produit) => {
    quantTeddies += produit.number;
    teddiesPrice = produit.price / 100;
    totalFact += teddiesPrice * produit.number;
  });
  totalQuant.innerHTML = quantTeddies;

  let totalSum = document.getElementById("total_sum");

  totalSum.innerHTML = `${totalFact} €`;
  console.log(totalFact);
};

function removeProduct(i) {
  // Recupérer le array
  userBasket.splice(i, 1);
  localStorage.clear();
  // Mettre à jour le localStorage avec le nouveau panier
  localStorage.setItem("userBasket", JSON.stringify(userBasket));
  // Réactualiser la page avec le nouveau montant du panier/ou panier vide
  window.location.reload();
}

checkBasket();
ligneProduit();
totalFacture();
