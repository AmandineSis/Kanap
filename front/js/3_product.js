/**
 * Gestion de l'affichage du produit sélectionné sur product.html et des interactions de la page
 */


/**
 * Extrait l'Id du produit de l'URL de la page
 * @param {string} docUrl 
 * @returns {string} id du produit 
 */
 function  getIdParams (docUrl) {
    url = new URL(docUrl);
    return  id = url.searchParams.get("_id");
}

//Récupération de l'Id du produit à partir de l'URL de la page
str = document.URL;
getIdParams(str); //return id

//Requête du produit sélectionné sur l'API
fetch(`http://localhost:3000/api/products/${id}`)
    .then (dataSingle => dataSingle.json())  
    .then(jsonSingleProduct => {

        /*************************************************** */
        /*         Affichage du produit sur le DOM           */
        /*****************************************************/

        let product = new Products(jsonSingleProduct);
        product.displayProductImage('.item__img');
        product.displayProductName('#title');
        product.displayProductPrice('#price');
        product.displayProductDescription('#description');
        for (let colorsItem of product.colors) {
            product.displayProductColors(colorsItem);
        }
        
        /***************************************************** */
        /*             Gestions des intéractions               */
        /*******************************************************/
     
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
         */
        function calculateTotalPrice (value1, value2){
            return value1 * value2;
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
         * Vérifie si l'objet "selection" existe déjà dans "cart" en comparant l'id du produit et la couleur
         * @param {string} obj objet "selection"
         * @returns {boolean} retourne "true" si objet existe dans le panier
         */
        function isSelectionInCart(obj){
            for (items in cart) {
                if(cart[items].id != obj.id || cart[items].color != obj.color ){
                    items ++;               
                }else{
                    return true;   
                }
            }
        }
        
        /**
         * Compare les produits du panier avec le produit sélectionné et retourne l'index de l'objet déjà existant s'il y en a un
         * @param {*} obj objet selection
         * @returns {number} items index de l'objet existant
         */
        function getObjIndex(obj){  //inverser conditions ???
            for (items in cart) {
                if(cart[items].id != obj.id || cart[items].color != obj.color ){
                    items ++;               
                }else{
                    return  items;  
                }
            }
        }   
        
        /**
         * Modifie l'objet déjà présent dans le panier avec l'objet sélectionné
         * @param {*} objItems index de l'objet à modifier
         * @param {*} objToChange 
         */    
        function modifyObjInCart(objItems, objToChange){
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
         * Affiche une fenètre pop up permettant d'accéder au panier ou à la page d'accueil
         * @param {number} quantity nombre d'articles à ajouter au panier
         */ 
        function confirmationPopup(quantity){
            if (window.confirm(`${quantity} articles ajouté au panier, OK pour voir le panier Annuler pour retourner à la page d'accueil`)){
                window.location.href = "cart.html";
            }else{
                window.location.href = "index.html";
            }
            }
    
        /**
         * ajout du produit sélectionné au panier
         */
        function addToCart() {
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
            const selection = new Selection(product._id, 
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
        }

        /****************************************************** */
        /*                   Event Listener                     */
        /********************************************************/

        // Ecouter le changement de la sélection de couleur
        const colorSelection = document.getElementById('colors');
        let color = colorSelection.value;

        colorSelection.addEventListener('change', selectColor); 
        
    
        //Ecouter la saisie de la quantité
        const quantityInput = document.getElementById('quantity');
        let quantity = quantityInput.value;

        quantityInput.addEventListener('input', getQuantity);
        

        //Ecouter le clic du bouton "ajouter au panier"
        const buttonAdd = document.getElementById('addToCart');

        buttonAdd.addEventListener("click", addToCart);

    })
    .catch(function(err) {
        document
            .querySelector(".item__img")
            .innerHTML += `Désolés, ce produit est actuellement indisponible.`; 
         console.log("impossible d'afficher les données " + err);
     })