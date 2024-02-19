import { ShoppingCart } from "./models/shoppingCart.js";
import { activeState } from "./functions/activeState.js";

// SHOPPING CART ELEMENTS
const shoppingCartIconNav = document.getElementById("shopping-cart-icon-nav");
const btnCloseCart = document.getElementById("btn-close-cart");

const shoppingCart = new ShoppingCart();

activeState();

// SHOPPING CART
shoppingCartIconNav.addEventListener("click", () => {
  shoppingCart.showCartProducts();
  shoppingCart.showCartTotalPayment();
});

btnCloseCart.addEventListener("click", () => {
  shoppingCart.closeCart();
});