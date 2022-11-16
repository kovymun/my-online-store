/***LEVEL ONE TASK 15 - NAVBAR SHOPPING CART ICON JAVASCRIPT FILE***/
/*
Code below updates the number of items added to the shopping cart, with data from local storage,
on the top right hand side of the navbar cart icon.
*/
let basket = JSON.parse(localStorage.getItem("products")) || [];

function iconCalculation() {
  let cartIcon = document.getElementById("cart-amount");
  cartIcon.innerHTML = basket
    .map((products) => products.numberOfItems)
    .reduce((x, y) => x + y, 0);
}
iconCalculation();
