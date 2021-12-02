/**
 * Extrait l'Id du produit de l'URL de la page
 * @param {string} docUrl 
 * @returns {string} id du produit 
 */
function  getIdParams (docUrl) {
    url = new URL(docUrl);
    return  id = url.searchParams.get("_id");
}

/**
 * Récupère la valeur de la couleur sélectionnée
 * @return {string} color
 */
 function selectColor() {
    color = this.value;
    }

/**
 * Récupère la valeur de la quantité choisie
 * @return {*} quantity
 */
 function getQuantity(){      
    quantity = this.value; //retourne la valeur sélectionnée  
    }



/**
 * Multiplie 2 valeurs
 * @param {number} value1 
 * @param {number} value2 
 * @returns 
 */
function calculateTotalPrice (value1, value2){
    return value1 * value2;
}

/**
 * Récupère la valeur associée à la clé définie en paramètre sur localStorage s'il existe.
 * @param {string} key clé recherchée sur le localStorage
 * @param {string} value variable où sera stockée le résultat retournée
 * @returns {*} value 
 */
function getCart(key, value) {
return value = JSON.parse(localStorage.getItem(key));
}    

/**
 * Vérifie si l'objet "selection" existe déjà dans "cart" en comparant l'id du produit et la couleur
 * @param {string} idCart id du produit se trouvant dans "cart"
 * @param {string} idSelection id du produit sélectionné
 * @param {string} colorCart couleur du produit se trouvant dans "cart"
 * @param {string} colorSelection couleur du produit sélectionnée
 * @returns {number} item index de l'objet à modifier s'il existe déjà 
 */
function isSelectionInCart(idCart, idSelection, colorCart, colorSelection, item){
    if(idCart != idSelection || colorCart != colorSelection ){
        productExists = false;                
    }else{
        productExists = true;
        return item;
    } 
} 
/**
 * additionne 2 valeurs
 * @param {number} value1 
 * @param {number} value2 
 * @returns {number} value3
 */
function addValues (value1, value2, value3) {
    return value3 = value1 + value2;
}

function changeQuantityValue() {

}
function changeTotalPriceValue() {

}
/**
 * Modifie les valeurs "quantity" et "totalPrice" de l'objet existant dans "cart".
 * @param {number} quantityCart 
 * @param {number} quantitySelection 
 * @param {number} totalPriceCart 
 */
function modifyExistingProduct(quantityCart, quantitySelection,totalPriceCart){
   
        quantityCart = addValues(quantityCart, quantitySelection);
        totalPriceCart = addValues(totalPriceCart, quantitySelection);
        
        cart.splice(i, 1,cart[i]);
}


function addSelectionToCart(key){
    localStorage.setItem(key, JSON.stringify(cartArray));
}
function createCart(){

}
const confirmationPopup = (el) => {
    if (window.confirm(`${el} articles ajouté au panier, OK pour voir le panier Annuler pour retourner à la page d'accueil`)){
        window.location.href = "cart.html";
    }else{
        window.location.href = "index.html";
    }
}
