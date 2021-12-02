/**
 * Recuperation des produits du local storage
 * pour chaque produit afficher les données de l'API
 * Afficher le total de la quantité et du prix
 * Modification de la quantité ou suppression du produit (supprimer/modifier sur localstorage)
 * 
 *  
*/

//Récupération du tableau cartArray placé dans le local storage
//cartArray = JSON.parse(localStorage.getItem("productSelection"));
getCartArray();
console.log(cartArray);

let totalQty = 0;
let totalPrice = 0;

//Boucle de récupération des produits
for (cartItem in cartArray) {
    let id = cartArray[cartItem].id;
    let color = cartArray[cartItem].color;
    let quantity = cartArray[cartItem].quantity;
    //let price = cartArray[cartItem].price;
    let totalProductPrice = cartArray[cartItem].totalProductPrice;
    let imageUrl = cartArray[cartItem].imageUrl;
    let altTxt = cartArray[cartItem].altTxt;
    let productName = cartArray[cartItem].productName;

    //Incrémentation de la quantité totale de produits
    let parseQty = parseFloat(quantity);
    totalQty += parseQty;

    //Incrémentation du prix total
    let parsePrice = parseFloat(totalProductPrice);
    totalPrice += parsePrice;

    displayCartProduct(id, color, totalProductPrice, quantity, productName, imageUrl, altTxt,);
  }

  console.log(totalPrice);
  /**********************************************Total articles - Prix et Quantité ******************************/
  //affichage du nombre total de produit dans cart.html
  document
    .getElementById("totalQuantity")
    .innerHTML += `${totalQty}`;
  
  //affichage du prix total dans cart.html
  document
    .getElementById("totalPrice")
    .innerHTML += `${totalPrice}`;

/********************************************Modification quantité*********************************************/
function changeQty(){ //diviser la fonction en 2 - quantity et prix
  for (cartItems in cartArray){

    let cartChange = cartArray[cartItems];
    if (cartArray[cartItems].id == id && cartArray[cartItems].quantity != quantity){

      cartChange.quantity = quantity;
      console.log(typeof cartArray[cartItems].price);

      let newQty = parseFloat(cartChange.quantity);
      let newPrice = cartArray[cartItems].price;

      let newTotalPrice = (newQty * newPrice)/*.toString(10)*/;
      cartChange.totalProductPrice = newTotalPrice;
      console.log(newTotalPrice);

      cartArray.splice(cartItems, 1, cartChange);
      localStorage.setItem("productSelection", JSON.stringify(cartArray));

      location.reload();
    }
  }
}

//Sélectionner l'élément à écouter
let qtyInput = document.querySelectorAll(".itemQuantity");
//Pour chaque produits on écoute le changement de quantité s'il y en a un
qtyInput.forEach(item =>{
  item.addEventListener("change", getNewQty);
//on récupère la nouvelle valeur de la quantité  
  function getNewQty(){
    quantity = this.value;
//on remplace la quantité dans le tableau à l'index correspondant à l'id la plus proche du btn cliqué
      let el = item.closest('.cart__item');
      id = el.dataset.id;
      console.log(quantity);
      console.log(id);
      changeQty();
  }
})


/********************************************Suppression produit***********************************************/
function RemoveFromStorage() {
  for (cartItems in cartArray) {
    if (cartArray[cartItems].id == id) {

      cartArray.splice(cartItems, 1);
      localStorage.setItem("productSelection", JSON.stringify(cartArray));

      location.reload();
    }
   }
  }


let deleteBtn = document.querySelectorAll(".deleteItem");

deleteBtn.forEach(item =>{
  item.addEventListener("click", deleteProduct);

  function deleteProduct() {
    console.log("produit supprimé");
    let el = item.closest('.cart__item');
      id = el.dataset.id;
      console.log(id);
      RemoveFromStorage();
  }
  
})







