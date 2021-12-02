/*Possibilité sur la page panier de saisir vos coordonnées et de confirmer la commande
récup et analyser données saisies par utilisateur ds le formulaire
afficher message erreur si besoin (ex. bonjour dans email)
constituer un objet contact à partir du formulaire et un tableau produit
*/
/**
 * qd appuie sur btn commander
 * valider les données utilisateurs
 * afficher msg erreur si mauvaises données
 * creer un objet utilisateur
 * creer un tableau des articles du panier
 * 
 * 
 */
 let form = document.querySelector(".cart__order__form");

let regexLetters = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/
let regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/
let regexEmail = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/ ;

function lettersOnlyValid(value) {
  return regexLetters.test(value);
}

function addressValid(value) {
  return regexAddress.test(value);
}

function emailValid(value) {
  return regexEmail.test(value)
}
//validation du prénom
form.firstName.addEventListener('input', function(e){
  let value = e.target.value;
  if (value != "" && lettersOnlyValid(value) == true) {
      validity = true;
      document.getElementById("firstNameErrorMsg").innerHTML = "";
      console.log("ok")
  } else {
      validity = false;
      document.getElementById("firstNameErrorMsg").innerHTML = "Prénom invalide";
  }
  disableSubmit(validity);
});
//validation du nom
form.lastName.addEventListener('input', function(e){
  let value = e.target.value;
  if (value != "" && lettersOnlyValid(value) == true) {
      validity = true;
      document.getElementById("lastNameErrorMsg").innerHTML = "";
      console.log("ok")
  } else {
      validity = false;
      document.getElementById("lastNameErrorMsg").innerHTML = "Nom invalide";
  }
  disableSubmit(validity);
});
//validation de l'adresse
form.address.addEventListener('input', function(e){
  let value = e.target.value;
  if (value != "" && addressValid(value) == true) {
      validity = true;
      document.getElementById("addressErrorMsg").innerHTML = "";
      console.log("ok")
  } else {
      validity = false;
      document.getElementById("addressErrorMsg").innerHTML = "Adresse invalide";
  }
  disableSubmit(validity);
});
//validation de la ville
form.city.addEventListener('input', function(e){
  let value = e.target.value;
  if (value != "" && lettersOnlyValid(value) == true) {
      validity = true;
      document.getElementById("cityErrorMsg").innerHTML = "";
      console.log("ok")
  } else {
      validity = false;
      document.getElementById("cityErrorMsg").innerHTML = "Ville  invalide";
  }
  disableSubmit(validity);
});
//validation de l'email
form.email.addEventListener('input', function(e){
  let value = e.target.value;
  if (value != "" && emailValid(value) == true) {
      validity = true;
      document.getElementById("emailErrorMsg").innerHTML = "";
      console.log("ok")
  } else {
      validity = false;
      document.getElementById("emailErrorMsg").innerHTML = "Email invalide";
  }
  disableSubmit(validity);
});





//on écoute le bouton commander
let orderBtn = document.getElementById("order");

orderBtn.addEventListener("click", sendOrder);

function sendOrder(event) {

  /**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
  event.preventDefault();
  let contact= {
    firstName: form.firstName.value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
};

let products = [];
cartArray = JSON.parse(localStorage.getItem("productSelection"));

console.log(cartArray);

for (cartItem in cartArray) {
  let productId = cartArray[cartItem].id;
  console.log(typeof productId);
  products.push(productId);
}

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
.catch((erreur) => console.log("erreur : " + erreur));
}

