/***LEVEL ONE TASK 15 - JAVASCRIPT INDEX FILE (TO DISPLAY ITEMS ON THE PRODUCTS PAGE)***/
/**KINDLY REFER TO THE END OF THIS DOCUMENT FOR ALL ACKNOWLEDGEMENTS AND REFERENCES**/

//Retrieving the element to display all product items.
let shop = document.getElementById("shop");

//This basket array is defined to retrieve product data stored in localStorage.
let basket = JSON.parse(localStorage.getItem("products")) || [];

/*
Function to generate each product item to be displayed on the products page.
shopItem array referenced from the prodInventory.js file.
*/
function generateShop() {
  return (shop.innerHTML = shopItems
    .map(function (product) {
      //ES6 object destructuring
      let { id, name, price, desc, img } = product;
      let searchProduct =
        basket.find((productItem) => productItem.id === id) || [];
      return `<div id="product-${id}" class="item">
    <img
      src=${img}
      alt="Picture of milk chocolate"
    />
    <div class="details">
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="price-quantity">
        <h2>R${price}</h2>
        <div class="cart-quantity">
          <h4 class="cart-qty-heading">Add to Cart</h4>
          <div class="quantity-buttons">
            <i onclick="decrementQty(${id})" id="minus" class="bi bi-dash-lg"></i>
            <div id="${id}" class="quantity">
            ${
              searchProduct.numberOfItems === undefined
                ? 0
                : searchProduct.numberOfItems
            }</div>
            <i onclick="incrementQty(${id})" id="plus" class="bi bi-plus-lg"></i>
          </div>
        </div>
        
      </div>
    </div>
  </div>`;
    })
    .join(""));
}

//Calling the generateShop() function
generateShop();

/*INCREMENT, DECREMENT AND UPDATE BUTTON FUNCTIONS*/
//Function to add items to the shopping cart on the products page (increment).
function incrementQty(id) {
  let selectedProduct = id;
  let searchProduct = basket.find(
    (productItem) => productItem.id === selectedProduct.id
  );
  if (searchProduct === undefined) {
    basket.push({
      id: selectedProduct.id,
      numberOfItems: 1,
    });
  } else {
    searchProduct.numberOfItems += 1;
  }
  qtyUpdate(selectedProduct.id);
  localStorage.setItem("products", JSON.stringify(basket));
  alert(alertTotalPurchaseAmount());
}

//Function to remove items from the shopping cart on the products page (decrement).
function decrementQty(id) {
  let selectedProduct = id;
  let searchProduct = basket.find(
    (productItem) => productItem.id === selectedProduct.id
  );
  if (searchProduct === undefined) {
    return;
  } else if (searchProduct.numberOfItems === 0) {
    return;
  } else {
    searchProduct.numberOfItems -= 1;
    alert(alertTotalPurchaseAmount());
  }
  qtyUpdate(selectedProduct.id);
  basket = basket.filter((productItem) => productItem.numberOfItems !== 0);
  localStorage.setItem("products", JSON.stringify(basket));
}

/*
Function to update and display the number of items, per product item, to be added to the shopping cart 
on the products page.
*/
function qtyUpdate(id) {
  let searchProduct = basket.find((productItem) => productItem.id === id);
  document.getElementById(id).innerHTML = searchProduct.numberOfItems;
  iconCalculation();
}

//Function to allow the current total purchase amount to be displayed as an alert message on addition and removal of items to/from the shopping cart.
function alertTotalPurchaseAmount() {
  if (basket.length !== 0) {
    totalAmount = basket
      .map((product) => {
        let { numberOfItems, id } = product;
        let searchProduct =
          shopItems.find((productItem) => productItem.id === id) || [];
        let vatAmt = searchProduct.price * 0.15;
        totalItemPrice = searchProduct.price + vatAmt;
        return numberOfItems * totalItemPrice;
      })
      .reduce((x, y) => x + y, 0)
      .toFixed(2);
    return `Your total bill is = ${totalAmount}.`;
  } else return;
}

/*
Function to calculate of all items in the shopping cart, as selected by the user, to be added and displayed to the 
navbar shopping icon.
*/
function iconCalculation() {
  let cartIcon = document.getElementById("cart-amount");
  cartIcon.innerHTML = basket
    .map((products) => products.numberOfItems)
    .reduce((x, y) => x + y, 0);
}
//Invoking the iconCalculation() function
iconCalculation();

/**ACKNOWLEDGEMENTS AND REFERENCES**/
/*
ACKNOWLEDGEMENTS:
Special Mentions to Mentors Jason Morta and Ronny Nijimbere for their assistance in completing this task.
*/

/*
REFERENCES:
Referenced a YouTube video to complete this task - highlighted below.
"Build a Shopping Cart with JavaScript – Project Tutorial." Youtube, uploaded by freeCodeCamp.org, 31 May 2022, https://www.youtube.com/watch?v=cT_ZYrS3tKc

Javascript Array methods:
Methods researched and utilized: .map(), .filter(). .find(), .reduce(), .join(), .push()
Referenced the MDN Dev Docs website for this information.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

ES6 arrow functions:
Researched and utilized arrow functions in completing this task.
Referenced the MDN Dev Docs website for this information.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

ES6 Destructuring:
Researched and utilized ES6 destructuring to access items of the basket array of items from localStorage and the shopItems inventory.
Referenced the MDN Dev Docs website for this information.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
*/
