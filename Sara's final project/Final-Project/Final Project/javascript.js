// OPEN & CLOSE CART
var cartIcon = document.querySelector("#cart-icon");
var cart = document.querySelector(".cart");
var closeCart = document.getElementById("cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

//Start when the document is ready
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

//************ START ***************************************
function start() {
  addEvents();
}
//************ UPDATE & RERENDER ***************************
function update(price) {
  addEvents();
  updateTotal(price);
}
//************ ADD EVENTS***********************************
function addEvents() {
  //Remove items from cart

  //Change item quantity
  var cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });
  //Add item to cart
  var addCart_btns = document.querySelectorAll("#add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  //Buy Order
  var buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}
//************ HANDLE EVENTS FUNCTIONS***********************************
var itemsAdded = [];

function handle_addCartItem() {
  var product = this.parentElement;
  var title = product.querySelector(".product-title").innerHTML;
  var price = parseInt(
    product.querySelector(".product-price").innerHTML.replace("$", "")
  );
  console.log(price);
  var imgsrc = product.querySelector(".product-img").src;
  let newToAdd = {
    title,
    price,
    imgsrc,
  };

  //handle item is already exist
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  //Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgsrc);
  var newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  var cartContent = document.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  // Add products to the node list
  var cartRemove_btns = document.querySelectorAll("#cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  updateTotal(price);
}

//***************************REMOVE-ITEM ***************************/

function handle_removeCartItem() {
  console.log("Hello");
  var parent = this.parentElement;
  console.log("Before" + itemsAdded);
  itemsAdded = itemsAdded.filter((el) => {
    console.log(el);
    return el.title != parent.querySelector(".cart-product-title").innerHTML;
  });
  console.log("After" + itemsAdded);
  parent.remove();
  updateTotal();
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); //to keep it integer
  updateTotal(price);
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There Is No Order to Place Yet! \nPlease Make an Order First .");
    return;
  }
  var cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Your Order Is Placed Successfully :)");
  itemsAdded = [];
  var cartPrice = document.querySelector(".cart-total-price");
  cartPrice.innerHTML = 0;
  updateTotal(price);
}

//************ UPDATE & RERENDER FUNCTIONS***************************
var total = 0;
function updateTotal() {
  // var cartBoxes = document.querySelectorAll(".product-box");
  // var totalPrice = document.querySelector(".product-price");
  var cartPrice = document.querySelector(".cart-total-price");
  var totalPrice = 0;
  itemsAdded.map((item) => (totalPrice += item.price));
  console.log(totalPrice);
  // var priceElement = document.querySelector(".product-price");

  // price = parseInt(price.replace("$", ""));
  // console.log(price);
  console.log(cartPrice);
  // total += price;
  cartPrice.innerHTML = totalPrice;
  // cartBoxes.forEach((cartBox) => {});

  //keep 2 digits after the decimal point
  // total = total.toFixed(2);
  // or you can use also
  // totalPrice.innerHTML = total;
}

//************ HTML COMPONENTS ***************************

function CartBoxComponent(title, price, imgsrc) {
  return `
  <div class="cart-box">
  <img src=${imgsrc} alt="" class="cart-img">
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
  </div>
  <!-- REMOVE CART-->   
  <i class='bx bxs-trash-alt' id="cart-remove" ></i>         
  </div>`;
}

//************ Heart ***************************************

var btn = document.getElementById("heart");
btn.addEventListener("click", onclick);
function onclick() {
  alert("My Favorite");
}

//************ LOGIN PAGE***************************************

function validateForm(e) {
  e.preventDefault();
  var name = document.loginForm.name.value;
  var password = document.loginForm.password.value;
  if (name.length == 0) return alert(`name is required`);
  if (password.length < 5) return alert(`password length should more than 5`);
}

//************ COLLECTIO PAGE***************************************

// var circle = document.querySelector(".color-option");
// circle.addEventListener("click", (e) => {
//   let target = e.target;
//   if (target.classList.contains("circle")) {
//     circle.querySelector(".active").classList.remove("active");
//     target.classList.add("active");
//   }
// });
