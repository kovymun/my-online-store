/***LEVEL ONE TASK 15 - SHOPPING CART JAVASCRIPT FILE***/
/**KINDLY REFER TO THE END OF THIS DOCUMENT FOR ALL ACKNOWLEDGEMENTS AND REFERENCES**/

//Retrieving all the elements.
let cartEmptyLabel = document.getElementById("cart-empty-display");
let shoppingCart = document.getElementById("shopping-cart");

//This basket array is defined to retrieve product data stored in localStorage.
let basket = JSON.parse(localStorage.getItem("products")) || [];

let totalAmount = 0;
let discount = 0;

/*
Function to create and display each product item added to the shopping cart.
shopItem array referenced from the prodInventory.js file.
*/
function generateCartItems() {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((product) => {
        let { id, numberOfItems } = product;
        let searchProduct =
          shopItems.find((productItem) => productItem.id === id) || [];
        return `
      <div class="cart-item">
        <img src="${searchProduct.img}" alt="">
        <div class="cart-item-details">
            <div class="item-title-price">
                <h4 class="title-price">
                    <p class="cart-item-title">${searchProduct.name}</p>
                    <p class="cart-item-price">R${searchProduct.price}</p>
                </h4>
                <i onclick="removeCartItem(${id})" class="bi bi-x-circle-fill"></i>
            </div>
            <div class="cart-quantity-buttons">
              <i onclick="decrementQty(${id})" id="minus" class="bi bi-dash-lg"></i>
                <div id="${id}" class="quantity">${numberOfItems}</div>
              <i onclick="incrementQty(${id})" id="plus" class="bi bi-plus-lg"></i>
            </div>
            <h3 class="item-tprice">R${numberOfItems * searchProduct.price}</h3>
        </div>
      </div>`;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    cartEmptyLabel.innerHTML = `
        <h2>Your Shopping Cart is Empty!</h2>
        <a href="products.html">
          <button class="cart-btn">Continue Shopping</button>
        </a>
        `;
  }
}

//Invoking the generateCartItems() function.
generateCartItems();

/*INCREMENT, DECREMENT AND UPDATE BUTTON FUNCTIONS*/
//Function to add items to the shopping cart from the individual cart item(increment).
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
  generateCartItems();
  totalPurchaseAmount();
  localStorage.setItem("products", JSON.stringify(basket));
}

//Function to remove items to the shopping cart from the individual cart item(decrement).
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
  }
  qtyUpdate(selectedProduct.id);
  basket = basket.filter((productItem) => productItem.numberOfItems !== 0);
  generateCartItems();
  totalPurchaseAmount();
  localStorage.setItem("products", JSON.stringify(basket));
}

//Function to update the quantity and display the number of items, per product item, added to each cart item.
function qtyUpdate(id) {
  let searchProduct = basket.find((productItem) => productItem.id === id);
  document.getElementById(id).innerHTML = searchProduct.numberOfItems;
  iconCalculation();
}

/**REMOVE CART ITEM VIA "X" BUTTON**/
//This function removes a cart item from the shopping cart page as well as from Navbar Cart Icon, when the x button is clicked.
function removeCartItem(id) {
  let selectedCartItem = id;
  basket = basket.filter(
    (productItem) => productItem.id !== selectedCartItem.id
  );
  generateCartItems();
  iconCalculation();
  totalPurchaseAmount();
  localStorage.setItem("products", JSON.stringify(basket));
}

/*
Code below updates the number of items added to the shopping cart, with data from local storage,
on the top right hand side of the navbar cart icon.
*/
function iconCalculation() {
  let cartIcon = document.getElementById("cart-amount");
  cartIcon.innerHTML = basket
    .map((products) => products.numberOfItems)
    .reduce((x, y) => x + y, 0);
}
iconCalculation();

/*
Function that displays an alert message that the user's order was successful. Researched and utilized the Math.random() function 
to generate a number representing the Reference Number of the order.
Referenced the w3schools website for this information.
https://www.w3schools.com/jsref/jsref_random.asp
*/
function confirmOrder() {
  let refNumber = Math.floor(Math.random() * 10000 + 1);
  alert(
    `Thank you - Your order was successful! REFERENCE NUMBER: SWEET${refNumber}.`
  );
}

//Function to clear the shopping cart - button click.
function clearShoppingCart() {
  basket = [];
  iconCalculation();
  generateCartItems();
  totalPurchaseAmount();
  localStorage.setItem("products", JSON.stringify(basket));
}

/**DELIVERY OPTION SECTION OF THE SHOPPING CART**/
/*
Form: radio button for user to choose between collection or delivery options.
Functionality: When the user selects the "collection" option, the delivery options are hidden. When the user selects the 
"delivery" option, the delivery options are visible to the user. Utilized jQuery hide() and show() functions to achieve this.
*/
let delSelect = document.getElementById("del-selection");
$("#del-selection").hide();

function deliverySelection() {
  $(".radio-group").change(function () {
    if ($('input:radio[value="collection"]').is(":checked")) {
      $("#del-selection").hide();
    } else {
      $("#del-selection").show();
    }
  });
}
deliverySelection();

/*
Using jQuery to create a drop-down menu for the delivery options.
Referenced information from freecodecamp website to create the drop-down menu.
https://www.geeksforgeeks.org/how-to-add-options-to-a-drop-down-list-using-jquery/?ref=rp

Delivery Fees:
Same Day Delivery = R60.
Overnight Express Delivery = R50
*/
$(document).ready(function () {
  let delOptions = {
    "Same-day (R60)": 60,
    "Over-night express (R50)": 50,
  };
  let delChoice = $("#del-selection");
  $.each(delOptions, function (text, val) {
    delChoice.append($("<option></option>").html(text).val(val));
  });
});

//Function to calculate the delivery fee.
let delPriceValue = 0;
function deliveryPrice() {
  let delSelection = document.getElementById("del-delivery");
  let options = delSelect.options[delSelect.selectedIndex];
  if (delSelection.checked && options.value !== "") {
    delPriceValue = Number(options.value);
  } else {
    delPriceValue = 0;
  }
  Number(totalAmount) + delPriceValue;
  totalPurchaseAmount();
}

/*
Function to apply a discount based on User Input.
Discount Value = R5.
*/
function userDiscount() {
  let discountInput = document.getElementById("discount-user-input").value;
  if (discountInput === "CHOCOLATE") {
    discount = 5;
  }
  totalPurchaseAmount();
}

/**CALCULATING AND DISPLAYING THE TOTAL PURCHASE AMOUNT**/
/*
Function to calculate and display the total purchase amount due by the customer.
This includes the product price, VAT, Delivery fees and Discount perks.
*/
function totalPurchaseAmount() {
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
    totalBill = (Number(totalAmount) + delPriceValue - discount).toFixed(2);

    cartEmptyLabel.innerHTML = `
    <h2>Total Bill : R${totalBill} incl. VAT</h2>
    <button onclick="confirmOrder()" class="cart-btn">Confirm Order</button>
    <button onclick="clearShoppingCart()" class="cart-btn">Clear Shopping Cart</button>`;
  } else return;
}
totalPurchaseAmount();

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

ES6 arrow function:
Researched and utilized arrow functions in completing this task.
Referenced the MDN Dev Docs website for this information.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

ES6 Destructuring:
Researched and utilized ES6 destructuring, to access items of the basket array of items from localStorage and the shopItems inventory.
Referenced the MDN Dev Docs website for this information.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
*/
