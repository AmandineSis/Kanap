/**
 * Gestion des produits en objet, gère l'affichage sur index.html et sur product.html
 */
class Products{
    constructor(jsonProducts) {
      jsonProducts && Object.assign(this, jsonProducts);
    }
    displayProduct(id) {
      document
          .querySelector(id)
          .innerHTML += `<a href="product.html?_id=${this._id}">
                           <article>
                             <img src="${this.imageUrl}" alt="${this.altTxt}">
                             <h3 class="productName">${this.name}</h3>
                             <p class="productDescription">${this.description}</p>
                           </article>
                         </a> `;
    }
    displayProductImage(id) {
      document
            .querySelector(id)
            .innerHTML += `<img src="${this.imageUrl}" alt="${this.altTxt}">`;
    }
    displayProductName(id) {
        document
            .querySelector(id)
            .innerHTML += `${this.name}`;
    }
    displayProductPrice(id){
        document
            .querySelector(id)
            .innerHTML += `${this.price}`;   
    }
    displayProductDescription(id)  {
        document
            .querySelector(id)
            .innerHTML += `${this.description}`;  
    }
    displayProductColors(colorsItem) {
      document
      .querySelector('#colors')
      .innerHTML += `<option value="${colorsItem}">${colorsItem}</option>`;    
    }
  }


/**
 * Gestion du produits sélectionné en objet, gère l'affichage sur cart.html
 */  
class Selection{
  constructor (id, productName, altTxt, imageUrl, totalPrice, color, quantity){
    Object.assign(this,  {id, productName, altTxt, imageUrl, totalPrice, color, quantity});
  }
  displayProduct(elId) {
    document
        .getElementById(elId)
        .innerHTML += ` <article class="cart__item" data-id="${this.id}">
                          <div class="cart__item__img">
                            <img src="${this.imageUrl}" alt="${this.altTxt}">
                          </div>
                          <div class="cart__item__content">
                            <div class="cart__item__content__titlePrice">
                              <h2>${this.productName}</h2>
                              <p>${this.totalPrice}€</p>
                              <p>${this.color}</p>
                            </div>
                            <div class="cart__item__content__settings">
                              <div class="cart__item__content__settings__quantity">
                                <p>Qté :  </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${this.quantity}">
                              </div>
                              <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                              </div>
                            </div>
                          </div>
                        </article>`;   
  }
}  

//Afichage du prix et de la quantité totale dans cart.html

function displayTotal(id, el){
  document
    .getElementById(id)
    .innerHTML += `${el}`;
}