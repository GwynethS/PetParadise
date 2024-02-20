import { ShoppingCart } from "./models/shoppingCart.js";
import { activeState } from "./functions/activeState.js";
import { setCategoryShopFilters } from "./functions/shopFilters.js";

// SHOPPING CART ELEMENTS
const shoppingCartIconNav = document.getElementById("shopping-cart-icon-nav");
const btnCloseCart = document.getElementById("btn-close-cart");
const btnCheckout = document.getElementById("btn-checkout");

// CATEGORY CARD ELEMENTS
const cardClothes = document.getElementById("card-clothes");
const cardAccessories = document.getElementById("card-accessories");
const cardToys = document.getElementById("card-toys");
const cardFood = document.getElementById("card-food");

const shoppingCart = new ShoppingCart();

activeState();

// SHOPPING CART
shoppingCartIconNav.addEventListener("click", () => {
  shoppingCart.showCartProducts();
  shoppingCart.showCartTotalPayment();
});

btnCloseCart.addEventListener("click", () => shoppingCart.closeCart());

btnCheckout.addEventListener("click", () => shoppingCart.onCheckout());

// CATEGORY CARDS
cardClothes.addEventListener("click", () =>
  setCategoryShopFilters(["clothes"])
);
cardAccessories.addEventListener("click", () =>
  setCategoryShopFilters(["accessories"])
);
cardToys.addEventListener("click", () => setCategoryShopFilters(["toys"]));
cardFood.addEventListener("click", () => setCategoryShopFilters(["food"]));
