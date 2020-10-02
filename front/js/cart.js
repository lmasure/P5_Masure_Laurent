const cartJson = localStorage.getItem("cart");
const cart = JSON.parse(cartJson);

const checkBasket = function () {
  // Vérifier que le panier contient un/des produit(s)
  if (cartJson == null) {
    alert("Votre panier est vide !");
    document.location.href = "./index.html";
  }
};

const ligneProduit = function () {
  for (let i in cart) {
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
    nomProduit.innerHTML = [cart[i].name];
    prixUnitProduit.textContent = [cart[i].price] / 100 + " €";
    nbProduit.textContent = [cart[i].number];
    cellTotalU.textContent =
      ([cart[i].number] * [cart[i].price]) / 100 + " €";
  }
};

const totalFacture = function () {
  let quantTeddies = 0;
  let teddiesPrice = 0;
  let totalFact = 0;
  let totalQuant = document.getElementById("total_qut");
  cart.forEach((produit) => {
    quantTeddies += produit.number;
    teddiesPrice = produit.price / 100;
    totalFact += teddiesPrice * produit.number;
  });
  totalQuant.innerHTML = quantTeddies;
  let totalSum = document.getElementById("total_sum");
  totalSum.innerHTML = `${totalFact} €`;
};

function removeProduct(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

function checkInput() {
  // Regex
  let checkString = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
  let checkMail = /[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})/;
  let checkAdresse = /^[^@&"()!_$*€£`%+=\/;?#]+$/;

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
  } else if (checkAdresse.test(formAdresse) == false) {
    alert(
      `Votre adresse contient un ou plusieurs des caractères interdits suivants : ` +
        '[^@&"()!_$*€£`%+=/;?#]' +
        " ou n'est pas renseignée."
    );
    return false;
  } else if (checkString.test(formVille) == false) {
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
      let products = cart.map((produit) => produit.id);

      // Création de l'objet à envoyer à l'API
      let objet = {
        contact,
        products,
      };
      // Enregistrement de l'objet order dans le localstorage
      localStorage.setItem("order", JSON.stringify(objet));
      
      fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objet),
       })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          localStorage.setItem("orderId", data.orderId);
    
      window.location.href = "thankyou.html";
        })
        .catch((error) => console.error(error));

      
    }
  });
}

// AFFICHAGE DU NOMBRE D'ARTICLES DANS LE HEADER
function showCartCount() {
  const cartCountElement = document.getElementById("cart-items");
  const cartJSON = localStorage.getItem("cart");
  let cartCount = 0;
  let cart = JSON.parse(cartJSON);
  if (cart) {
    cart.forEach((product) => {
      cartCount += product.number;
    });
    cartCountElement.innerText = cartCount;
  }
}
showCartCount();
checkBasket();
ligneProduit();
totalFacture();
validOrder();
