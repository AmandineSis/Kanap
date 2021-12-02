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
        

        /**************************************************** */
        /*             Gestions des intéractions              */
        /******************************************************/
   
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
        //createObjectSelection
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

        function changeQuantityValue(quantityCart, quantitySelection) {
            quantityCart = addValues(quantityCart,quantitySelection);
            return quantityCart;
            }   
        function AddValues(value1, value2) {
            value1 = value1 += value2;
            return value1;
            }
        /**
         * Modifie les valeurs "quantity" et "totalPrice" de l'objet existant dans "cart".
         * @param {number} quantityCart 
         * @param {number} quantitySelection 
         * @param {number} totalPriceCart 
         */
        function modifyExistingProduct(quantityCart, quantitySelection,totalPriceCart, totalPriceSelection){
        
                addValues(quantityCart,quantitySelection);
                addValues(totalPriceCart,totalPriceSelection );
                cart.splice(i, 1,cart[i]);
            }


        function addSelectionToCart(key,array){
            localStorage.setItem(key, JSON.stringify(array));
            }
         
        const confirmationPopup = (el) => {
            if (window.confirm(`${el} articles ajouté au panier, OK pour voir le panier Annuler pour retourner à la page d'accueil`)){
                window.location.href = "cart.html";
            }else{
                window.location.href = "index.html";
            }
            }

        function addToCart() {
            //Calcul du prix total de la sélection
            let totalPrice = calculateTotalPrice(quantity, product.price);


            //Création de l'objet "selection" à ajouter au localStorage
            let selection = new Selection(product._id, 
                                          product.name, 
                                          product.altTxt, 
                                          product.imageUrl, 
                                          //product.price,
                                          totalPrice, 
                                          color,  
                                          quantity);

          
            //on vérifie si le tableau cartArray existe dans le local storage 
            let cart = getCart();
            
            
            if(cart) {
                //On vérifie si le produit sélectionné existe dans le panier
                let productExists;
                let items;
                for (items in cart) {
                     isSelectionInCart(cart[items].id, selection.id, cart[items].color, selection.color, items);
                    }
         
                if (productExists) { //on change la valeur de qté et du prix total
                    
                    /**********************CREER FONCTION MODIFICATION CART ******************************** */
                    let objToChange = cart[items];  //stocke l'objet à l'index i de cartArray dans cartObj
                    modifyExistingProduct(objToChange.quantity, selection.quantity, objToChange.totalPrice, selection.totalPrice);
                    localStorage.setItem("selection", JSON.stringify(cart));
                    /*************************************************************************************** */
                    }else{   
                        cart.push(selection);
                        addSelectionToCart("selection", cart);
                    }    
            }else{
                cart = [];
                cart.push(selection); 
                localStorage.setItem("selection", JSON.stringify(cart));
            }     
            
            //confirmationPopup(quantity);      
        }
        
        /****************************************************** */
        /*                   Event Listener                     */
        /********************************************************/

        // Ecouter le changement de la sélection de couleur
        let color = undefined;
        let colorSelection = document.getElementById('colors');

        colorSelection.addEventListener('change', selectColor); 
        
        
        //Ecouter la saisie de la quantité
        let quantityInput = document.getElementById('quantity');
        let quantity = quantityInput.value;

        quantityInput.addEventListener('input', getQuantity);
        

        //Ecouter le clic du bouton "ajouter au panier"
        let buttonAdd = document.getElementById('addToCart');

        buttonAdd.addEventListener("click", addToCart);

        

            
        



    })
    .catch(function(err) {
         console.log("impossible d'afficher les données");
     })