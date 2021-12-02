/**
 * Gestion de l'affichage du produit sélectionné sur product.html
 */

fetch("http://localhost:3000/api/products")
.then(function(data) {
      if (data.ok) {
      return data.json();
  }})
.then(function(jsonListProducts) {
  for (let jsonProducts of jsonListProducts) {
      let product = new Products(jsonProducts);
      product.displayProduct("#items");
}})
.catch(function(err) {
  console.log("impossible d'afficher les données");
});
