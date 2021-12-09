/**
 * Gestion de l'affichage de la confirmation de commande et de l'ID associée
 */

/**
 * Extrait l'Id du produit de l'URL de la page
 * @param {string} docUrl 
 * @returns {string} id du produit 
 */
 function  getIdParams (docUrl) {
    url = new URL(docUrl);
    return  confirmId = url.searchParams.get("orderId");
}

//Récupération de l'Id du produit à partir de l'URL de la page
str = document.URL;
getIdParams(str); //return id


document.getElementById("orderId").innerHTML += `${confirmId}`;

