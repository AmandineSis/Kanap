/**
 * Gestion de l'affichage du panier sur cart.html et des interactions de la page
 */


/*************************************************** */
/*         Affichage des produits sur le DOM         */
/*****************************************************/

let cart;
getCart();
cart.sort(compare); //classe les produits du panier par nom
console.log(cart);

let totalQty = 0;
let totalPrice = 0;

for (items in cart) {
  let selection = new Selection(cart[items].id, 
                                cart[items].productName, 
                                cart[items].altTxt, 
                                cart[items].imageUrl, 
                                cart[items].price,
                                cart[items].totalPrice, 
                                cart[items].color,  
                                cart[items].quantity);
  
  selection.displayProduct("cart__items");

  //Incrémentation de la quantité et du prix totale de produit
  totalQty += selection.quantity;
  totalPrice += selection.totalPrice; 
  }
  //Affichage de la quantité et prix total du panier
  displayTotal("totalQuantity", totalQty);
  displayTotal("totalPrice", totalPrice);
 
/*************************************************** */
/*            Gestion des intéractions               */
/*****************************************************/

/**
 * compare les objets du tableau et les range par ordre alphabétique
 * @param {*} a 
 * @param {*} b 
 * @returns -1 0 ou 1 
 */
function compare( a, b ) {
  if ( a.productName < b.productName ){
    return -1;
  }
  if ( a.productName > b.productName ){
    return 1;
  }
  return 0;
}

/**
 * Récupère la valeur associée à la clé définie en paramètre sur localStorage s'il existe.
 * @param {string} key clé recherchée sur le localStorage
 * @param {string} arrayName variable où sera stockée le résultat retournée
 * @returns {*} arrayName retourne tableau d'objet s'il existe 
 */
 function getCart() {
  cart = JSON.parse(localStorage.getItem("selection"));
  return cart;
  }

 /**
 * Modifie l'objet déjà présent dans le panier avec l'objet sélectionné
 * @param {*} objItems index de l'objet à modifier
 * @param {*} objToChange 
 */    
  function modifyCart(objItems, objToChange){
    cart.splice(objItems, 1, objToChange)
} 

/**
* Ajoute l'objet sélectionné à localStorage
* @param {*} key nom de la clé à ajouté dans localStorage
* @param {*} array tableau à ajouter
*/
function addSelectionToLocalStorage(key,array){
  localStorage.setItem(key, JSON.stringify(array));
  }

/**
 * Mettre à jour la quantité du produit sélectionné dans le panier avec la quantité saisie
 */  
function changeQty(){ 
  for (items in cart){
    let cartObjToChange = cart[items];
    if (cartObjToChange.id == id && cartObjToChange.quantity != quantity){
        cartObjToChange.quantity = parseFloat(quantity);
        cartObjToChange.totalPrice = (cartObjToChange.quantity * cartObjToChange.price);
        modifyCart(items, cartObjToChange);
        addSelectionToLocalStorage("selection", cart);
        location.reload(); //actualisation de la page après modification
    }
  }
} 

/**
 * Supprime l'objet sélectionné du panier
 */
function RemoveFromStorage() {
    for (items in cart){
      if (cart[items].id == id) {
        if (window.confirm("Etes-vous sûr de vouloir supprimer ces articles ?")){
          cart.splice(items, 1);
          addSelectionToLocalStorage("selection", cart);
          location.reload();
        }else{
          location.reload();
          }
        }
      }
    }
    

/*************************************************** */
/*                Event Listener                     */
/*****************************************************/

// Pour chaque produit, écouter le changement de quantité s'il y en a un
let qtyInput = document.querySelectorAll(".itemQuantity");

qtyInput.forEach(inputBtn => {inputBtn.addEventListener("change", getNewQty);
function getNewQty(){
    quantity = this.value;
    let el = inputBtn.closest('.cart__item'); //sélectionne l'élément ".cart__item" le plus proche du bouton cliqué
    id = el.dataset.id;
    changeQty();
  }
})

// Pour chaque produit, écouter le clic sur le bouton supprimer
let deleteBtn = document.querySelectorAll(".deleteItem");

deleteBtn.forEach(deleteBtn =>{
  deleteBtn.addEventListener("click", deleteProduct);

    function deleteProduct() {
        let el = deleteBtn.closest('.cart__item'); //sélectionne l'élément ".cart__item" le plus proche du bouton cliqué
        id = el.dataset.id; 
        RemoveFromStorage();

    }
})
