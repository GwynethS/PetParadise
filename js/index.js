import { ShoppingCart } from "./classes/shoppingCart.js";

const shoppingCartIconNav = document.getElementById("shopping-cart-icon-nav");
const btnCloseCart = document.getElementById("btn-close-cart");
const cardClothes = document.getElementById("card-clothes");
const cardAccessories = document.getElementById("card-accessories");
const cardToys = document.getElementById("card-toys");
const cardFood = document.getElementById("card-food");

function setCategoryShopFilters(category){
  const filters = {
    orderSelected: "",
    minPrice: 0,
    maxPrice: Infinity,
    categoriesSelected: [category],
    searchByName: "",
  };

  sessionStorage.setItem("filters", JSON.stringify(filters));
  window.location.href = "./pages/tienda.html";
}

const shoppingCart = new ShoppingCart();

shoppingCartIconNav.addEventListener("click", () => {
  shoppingCart.showCartProducts();
  shoppingCart.showCartTotalPayment();
});

btnCloseCart.addEventListener("click", () => {
  shoppingCart.closeCart();
});

cardClothes.addEventListener("click", () => setCategoryShopFilters('clothes'));

cardAccessories.addEventListener("click", () => setCategoryShopFilters('accessories'));

cardToys.addEventListener("click", () => setCategoryShopFilters('toys'));

cardFood.addEventListener("click", () => setCategoryShopFilters('food'));
