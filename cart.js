



function checkBasket() {
  // Vérifier que le panier contient un/des produit(s)
  let etatPanier = JSON.parse(localStorage.getItem("userBasket"));
  if (etatPanier == null) {
    alert("Votre panier est vide !");
    document.location.href="http://127.0.0.1:5500/index.html"; 
    return false;
  } 
  
    else {
    
    // Créer la structure du tableau
    let facture = document.createElement("table");
    let ligneTableau = document.createElement("tr");
    let colonneNom = document.createElement("th");
    let colonnePrixUnitaire = document.createElement("th");
    let ligneTotal = document.createElement("tr");
    let colonneRefTotal = document.createElement("th");
    let colonnePrixPaye = document.createElement("td");

    // Placer la structure dans la page et le contenu des entêtes
    let factureSection = document.getElementById("cart-center");
    factureSection.appendChild(facture);
    facture.appendChild(ligneTableau);
    ligneTableau.appendChild(colonneNom);
    colonneNom.textContent = "Nom du produit";
    ligneTableau.appendChild(colonnePrixUnitaire);
    colonnePrixUnitaire.textContent = "Prix du produit";

    // Pour chaque produit du panier, créer une ligne avec le nom et le prix

    // Init de l'incrémentation de l'id des lignes pour chaque produit
    let i = 0;

    JSON.parse(localStorage.getItem("userBasket")).forEach((produit) => {
      // Créer la ligne
      let ligneProduit = document.createElement("tr");
      let nomProduit = document.createElement("td");
      let prixUnitProduit = document.createElement("td");
      let removeProduit = document.createElement("i");

      // Attribuer les classes
      ligneProduit.setAttribute("id", "produit" + i);
      removeProduit.setAttribute("id", "remove" + i);
      removeProduit.setAttribute("class", "fas fa-trash-alt removeProduct");
      // Pour chaque produit créer un event sur l'icone de la corbeille pour annuler ce produit
      removeProduit.addEventListener("click", removeProduct.bind(i));
      i++;

      // Insertion dans le HTML
      facture.appendChild(ligneProduit);
      ligneProduit.appendChild(nomProduit);
      ligneProduit.appendChild(prixUnitProduit);
      ligneProduit.appendChild(removeProduit);

      // Remplir le contenu des balises
      nomProduit.innerHTML = produit.name;
      prixUnitProduit.textContent = produit.price / 100 + " €";
    });

    // Dernière ligne du tableau : Total
    facture.appendChild(ligneTotal);
    ligneTotal.appendChild(colonneRefTotal);
    colonneRefTotal.textContent = "Total à payer";
    ligneTotal.appendChild(colonnePrixPaye);
    colonnePrixPaye.setAttribute("id", "total_sum");

    // Calcul du montant total
    let totalPaye = 0;
    JSON.parse(localStorage.getItem("userBasket")).forEach((produit) => {
      totalPaye += produit.price / 100;
    });

    // Affichage du prix total à payer
    
    document.getElementById("total_sum").textContent = `${totalPaye},00€`;
  }




    
  }





checkBasket();
