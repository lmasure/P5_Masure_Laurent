const userBasketJson = localStorage.getItem("userBasket");
const userBasket = JSON.parse(userBasketJson);

const checkBasket = function () {
  // Vérifier que le panier contient un/des produit(s)
  if (userBasketJson == null) {
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
    suppProduit.setAttribute(
      "class",
      "fas fa-trash-alt removeProduct d-flex justify-content-center"
    );
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
};

function removeProduct(i) {
  userBasket.splice(i, 1);
  // localStorage.clear();
  
  localStorage.setItem("userBasket", JSON.stringify(userBasket));
  window.location.reload();
}

function checkInput() {
  // Regex
  let checkString = /^[A-Z]{1}[a-z]/;
  let checkMail = /.+@.+\..+/;

  // Inputs de l'utilisateur
  let formNom = document.getElementById("formNom").value;
  let formPrenom = document.getElementById("formPrenom").value;
  let formMail = document.getElementById("formMail").value;
  let formAdresse = document.getElementById("formAdresse").value;
  let formVille = document.getElementById("formVille").value;

  // Vérifier les inputs de l'utilisateur
  if (checkString.test(formNom) == false) {
    alert("Votre nom doit être renseigné");
    return false;
  } else if (checkString.test(formPrenom) == false) {
    alert("Votre prénom doit être renseigné");
    return false;
  } else if (checkMail.test(formMail) == false) {
    alert("Votre email doit être au format xxx@yyy.zzz");
    return false;
  } else if (formAdresse == false) {
    alert(
      "Votre adresse contient un ou plusieurs caractères interdits ou n'est pas renseignée."
    );
    return false;
  } else if (formVille == false) {
    alert("Vous devez renseigner le nom de votre ville");
    return false;
  } else {
    return true;
  }
}

function validOrder() {
  let btnForm = document.getElementById("sendPost");
  // Au clic sur le bouton d'envoi vérification checkInput()
  btnForm.addEventListener("click", function (event) {
    event.preventDefault();
    // Verification de la conformité du formulaire avant envoi
    if (checkInput() == true) {
      // Objet contact avec le contenu du formulaire
      let contact = {
        firstName: document.getElementById("formNom").value,
        lastName: document.getElementById("formPrenom").value,
        email: document.getElementById("formMail").value,
        address: document.getElementById("formAdresse").value,
        city: document.getElementById("formVille").value,
      };
      //  Objet products id avec le contenu du panier
      let products = userBasket.map((produit) => produit.id);
      // Création de l'objet à envoyer à l'API
      let objet = {
        contact,
        products,
      };
      // Enregistrement de l'objet order dans le localstorage
      localStorage.setItem("order", JSON.stringify(objet));
      // Fonction pour envoyer l'objet
      // recuperation order localstorage
      let storageOrder = objet;
      // console.log(storageOrder);
      fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: storageOrder,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => console.log(data));

      //suppression de la clé du panier dans le localstorage
      // localStorage.removeItem("userBasket");
      // window.location.href = "thankyou.html";
    }
  });
}

checkBasket();
ligneProduit();
totalFacture();
validOrder();
