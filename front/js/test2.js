
let form = document.querySelector(".cart__order__form");

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

  function formValid()                                    
  { 
      var firstName = form.firstName;               
      var lastName =  form.lastName;  
      var address =form.address;
      var city = form.city; 
      var email = form.email;    
      
  
      if (firstName.value == "" || lettersOnlyValid(firstName.value) == false)                                  
      { 
          document.getElementById("firstNameErrorMsg").innerHTML = "Saisie invalide"; 
          firstName.focus(); 
          return false;         
      }    
      if (lastName.value == "" || lettersOnlyValid(lastName.value) == false)                           
      { 
        document.getElementById("lastNameErrorMsg").innerHTML = "Saisie invalide";
        lastName.focus(); 
        return false; 
      }        
      if (address.value == "" || addressValid(address.value) == false)                           
      { 
        document.getElementById("addressErrorMsg").innerHTML = "Saisie invalide";
        addresstName.focus(); 
        return false; 
      }     
      if (city.value == "" || lettersOnlyValid(city.value) == false)                           
      { 
        document.getElementById("cityErrorMsg").innerHTML = "Saisie invalide";
        city.focus(); 
        return false; 
      } 
      if (email.value == "" || emailValid(email.value) == false)                           
      { 
        document.getElementById("emailErrorMsg").innerHTML = "Saisie invalide";
        email.focus(); 
        return false; 
      }
      return true; 
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
      let contact= new Contact(form.firstName.value,
        document.getElementById("lastName").value,
        document.getElementById("address").value,
        document.getElementById("city").value,   
        document.getElementById("email").value);
        
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
  
//écoute le bouton "commander"
let orderBtn = document.getElementById("order");

orderBtn.addEventListener("click", function(e){
  let formIsValid = formValid();
  if (formIsValid){
  sendOrder(e);
  } else {
    return;
  }
});







quantity = parseFloat(quantity);
//Si couleur non définie, affichage d'une alerte et annulation de l'ajout du produit au panier
if (color == ""){
    alert("Veuillez sélectionner une couleur");
    return;
}
//si quantité inférieure à 1 ou supérieure à 100, affichage d'une alerte et annulation de l'ajout du produit au panier
if (quantity < 1 || quantity > 100){
    alert("Veuillez saisir une quantité entre 1 et 100");
    return
}

//Calcul du prix total de la sélection
let totalPrice = calculateTotalPrice(quantity, product.price);

//Création de l'objet "selection" à ajouter au localStorage
let selection = new Selection(product._id, 
                              product.name, 
                              product.altTxt, 
                              product.imageUrl, 
                              product.price,
                              totalPrice, 
                              color,  
                              quantity);

//on vérifie si le tableau cart existe dans le local storage 
let cart = getCart();

if(cart) {
    let productExists = isSelectionInCart(selection);
    let items = getObjIndex(selection);
   
    if (productExists) { //on change la valeur de qté et du prix total

        cart[items].quantity += selection.quantity;
        cart[items].totalPrice += selection.totalPrice;
        modifyObjInCart(items, cart[items]);
        }else{   
            cart.push(selection);
        }    
}else{
    cart = [];
    cart.push(selection); 
}     
addSelectionToLocalStorage("selection", cart);
confirmationPopup(quantity);