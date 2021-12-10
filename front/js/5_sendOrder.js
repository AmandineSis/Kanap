/**
 * Gestion du formulaire de contact et de l'envoi de la commande
 */

/*************************************************** */
/*            Gestion des intéractions               */
/*****************************************************/
const form = document.querySelector(".cart__order__form");

let regexLetters = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/
let regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/
let regexEmail = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/ ;
/******************************************************************************** */
function lettersOnlyValid(value) {
    return regexLetters.test(value);
  }
/******************************************************************************** */
function addressValid(value) {
    return regexAddress.test(value);
  }
/******************************************************************************** */
function emailValid(value) {
    return regexEmail.test(value)
  }
/******************************************************************************** */

/**
 * 
 * @param {*} e objectEvent
 * @param {*} fct fonction de validation des données saisie
 * @param {*} elementId élèment du DOM affichant l'erreur de saisie
 */
 function validFormInput(value, fct, elementId) {
    if (value != "" && fct(value) == true) {
        validity = true;
        document.getElementById(elementId).innerHTML = "";
    } else {
        validity = false;
        document.getElementById(elementId).innerHTML = "Saisie invalide";
    }
  return validity;
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
   * Ajoute l'ID des produits du panier dans le tableau "order"
   * @param {*} order tableau de stockage des données
   */
  function addProductIdToOrder(order){
      for (items in cart) {
        let productId = cart[items].id;
        order.push(productId);
      }  
    }
  
  /**
   * Envoie l'ID des produits du panier et l'objet "contact" à l'API 
   *  * Expects request to contain:
      * contact: {
      *   firstName: string,
      *   lastName: string,
      *   address: string,
      *   city: string,
      *   email: string
      * }
      * products: [string] <-- array of product _id
   */  
  function sendOrder(e) {
      e.preventDefault(); 
   /************************************************************* */
      let contact= new Contact(firstName.value,
        lastName.value,
        address.value,
        city.value,   
        email.value);
        
  /************************************************************* */
      let products = [];
      getCart();
      addProductIdToOrder(products);
      if (products.length == 0 ) {
        alert("Veuillez ajouter des articles au panier");
        location.reload();
        return;
      }  
  /************************************************************ */    
      fetch("http://localhost:3000/api/products/order/", {
              method: "POST",
              body: JSON.stringify({contact, products}),
              headers: {
                  "Content-Type": "application/json"
                  }
               })
              .then(function(res) {
                  if (res.ok) {
                      return res.json();
                    }
                })
              .then((res => {
                  let orderId = res.orderId;
                  window.location.href = `confirmation.html?orderId=${orderId}`;
                  localStorage.clear();
                }))
              .catch(function (err){
                alert("Une erreur est survenue pendant l'envoi de la commande, veuillez rééssayer plus tard");
                location.reload();
                console.log("erreur : " + err)});
              
  } 

/*************************************************** */
/*                Event Listener                     */
/*****************************************************/
const orderBtn = document.getElementById("order");

orderBtn.addEventListener('click', function(e){
  e.preventDefault();
  
  let firstNameIsValid = validFormInput(form.firstName.value, lettersOnlyValid, "firstNameErrorMsg");
  let lastNameIsValid = validFormInput(form.lastName.value, lettersOnlyValid, "lastNameErrorMsg");
  let addressIsValid = validFormInput(form.address.value, addressValid, "addressErrorMsg");
  let cityIsValid = validFormInput(form.city.value, lettersOnlyValid, "cityErrorMsg");
  let emailIsValid = validFormInput(form.email.value, emailValid, "emailErrorMsg");
 
if (!firstNameIsValid || !lastNameIsValid || !addressIsValid || !cityIsValid || !emailIsValid){
  alert("Les informations saisies ne sont pas valides");
  return;
}else{
  sendOrder(e);
}

});

 