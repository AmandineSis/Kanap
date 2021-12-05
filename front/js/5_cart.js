/**
 * Gestion de l'affichage du panier sur cart.html et des interactions de la page
 */


/*************************************************** */
/*         Affichage des produits sur le DOM         */
/*****************************************************/

cart = getCart();
console.log(cart);

let totalQty = 0;

let totalPrice = 0;

for (items in cart) {
  let selection = new Selection(cart[items]._id, 
                                cart[items].productName, 
                                cart[items].altTxt, 
                                cart[items].imageUrl, 
                                //product.price,
                                cart[items].totalPrice, 
                                cart[items].color,  
                                cart[items].quantity);
  
  selection.displayProduct("cart__items");
    
  //Incrémentation de la quantité totale de produit
  totalQty += cart[items].quantity;
  //Incrémentation du prix total
  totalPrice += cart[items].totalPrice;
  }
  //Affichage de la quantité et prix total du panier
  displayTotal("totalQuantity", totalQty);
  displayTotal("totalPrice", totalPrice);


/*************************************************** */
/*            Gestion des intéractions               */
/*****************************************************/

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
 * Récupère la valeur de la quantité choisie
 * @return {*} quantity
 */
 function getQuantity(){      
    quantity = this.value; //retourne la valeur sélectionnée  
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
 * Change la quantité du produit sélectionné dans localStorage
 */  
function changeQty(){ //diviser la fonction en 2 - quantity et prix
    for (items in cart){

      objToChange = cart[items];

      if (objToChange.id == selection.id && objToChange.color == selection.color && objToChange.quantity != selection.quantity){
          objToChange.quantity = quantity;
         // let newQty = /*parseFloat(*/objToChange.quantity;//);
          //let newPrice = cart[items].price;
          //let newTotalPrice = (objToChange.quantity * cart[items].price)/*.toString(10)*/;
          objToChange.totalProductPrice = (objToChange.quantity * cart[items].price);
          console.log(newTotalPrice);
          modifyObjInCart(items, objToChange);
          addSelectionToLocalStorage("selection", cart);
          location.reload();
          }
        }
    }

/**
 * change le prix total du produit sélectionné dans [cart]
 */
function changeTotalPrice(){
for (items in cart){

  objToChange = cart[items];
  if (objToChange.id == selection.id && objToChange.color == selection.color && objToChange.quantity != selection.quantity){

    cartChange.quantity = quantity;
    //console.log(typeof cart[items].price);

    let newQty = /*parseFloat(*/cartChange.quantity;//);
    let newPrice = cart[items].price;

    let newTotalPrice = (newQty * newPrice)/*.toString(10)*/;
    cartChange.totalProductPrice = newTotalPrice;
    console.log(newTotalPrice);

    modifyObjInCart(objItems, objToChange);
    addSelectionToLocalStorage("selection", cart);

    location.reload();
  }}
}

/**
 * on remplace la quantité dans le tableau à l'index correspondant à l'id la plus proche du btn cliqué
 * @param {*} e 
 * @param {*} items 
 */
function selectProductToChange(e){
    el = items.closest(e);
    id = el.dataset.id;
}

/**
 * Supprime l'objet sélectionné du localSTorage
 */
function RemoveFromStorage() {
  for (items in cart) {
    if (cart[items].id == id) {

      cart.splice(items, 1);
      addSelectionToLocalStorage("selection", cart);

      location.reload();
    }}}

/************Modification de la quantité************ */   

/**
 * modifie la quantité du produit sélectionné dans le panier
 */
function modifyCartQuantity(){
    //on récupère la nouvelle valeur de la quantité  
    let quantity = getQuantity();
    selectProductToChange('.cart__item');
    //console.log(quantity);
    //console.log(id);
    changeQty();
    changeTotalPrice();
}
/***************Suppression du produit************** */

/**
 * sélectionne le produit et le supprime du localStorage
 */    
function deleteProduct() {
    selectProductToChange('.cart__item');
    RemoveFromStorage();
  }

/*************************************************** */
/*                Event Listener                     */
/*****************************************************/

////Ecouter le changement de quantité
let qtyInput = document.querySelectorAll(".itemQuantity");

qtyInput.forEach(item => {item.addEventListener("change", modifyCartQuantity)});

//Ecouter le clic du bouton "ajouter au panier"
let deleteBtn = document.querySelectorAll(".deleteItem");

deleteBtn.forEach(item => {item.addEventListener("click", deleteProduct)});
