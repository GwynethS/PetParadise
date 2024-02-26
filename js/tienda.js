import { Shop } from "./models/shop.js";
import { ShoppingCart } from "./models/shoppingCart.js";
import { activeState } from "./functions/activeState.js";
import {
  loadCategoryFilterChecked,
  searchProduct,
} from "./functions/shopFilters.js";

//SHOPPING CART ELEMENTS
const shoppingCartIconNav = document.getElementById("shopping-cart-icon-nav");
const btnCloseCart = document.getElementById("btn-close-cart");
const btnCheckout = document.getElementById("btn-checkout");

//PAGINATION ELEMENTS
const previusPageProducts = document.getElementById(
  "btn-previous-page-products"
);
const nextPageProducts = document.getElementById("btn-next-page-products");
const currentPageProducts = document.getElementById("current-page-products");

// FILTER ELEMENTS
const orderByRadioButtons = document.querySelectorAll(
  'input[name="order-by-list"]'
);
const categoryCheckBoxes = document.querySelectorAll(
  'input[name="category-filter-list"]'
);

const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");

const searchBarInput = document.getElementById("input-search-bar");
const btnSearchBar = document.getElementById("btn-search-bar");

const btnClearSortFilter = document.getElementById("btn-clear-sort-filter");
const btnClearCategoryFilter = document.getElementById(
  "btn-clear-category-filter"
);
const btnClearPriceFilter = document.getElementById("btn-clear-price-filter");

// INSTANCIAR CLASES

const shop = new Shop();
const shoppingCart = new ShoppingCart();

activeState();

loadCategoryFilterChecked(categoryCheckBoxes, btnClearCategoryFilter);

// SHOPPING CART

shoppingCartIconNav.addEventListener("click", () => {
  shoppingCart.updateProducts();
  shoppingCart.showCartProducts();
  shoppingCart.showCartTotalPayment();
});

btnCloseCart.addEventListener("click", () => shoppingCart.closeCart());

btnCheckout.addEventListener("click", () => shoppingCart.onCheckout());

//SEARCH BAR

searchBarInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter" || !searchBarInput.value) {
    searchProduct(shop, searchBarInput);
    currentPageProducts.value = 1;
  }
});

btnSearchBar.addEventListener("click", () => {
  searchProduct(shop, searchBarInput);
  currentPageProducts.value = 1;
});

// ORDER BY FILTER

orderByRadioButtons.forEach((button) => {
  button.addEventListener("change", (event) => {
    const selectedValue = event.target.id;
    shop.orderSelected = selectedValue;
    shop.filterProducts();
    currentPageProducts.value = 1;
    btnClearSortFilter.style.display = "block";
  });
});

btnClearSortFilter.addEventListener("click", () => {
  shop.orderSelected = "";
  orderByRadioButtons.forEach((radio) => (radio.checked = false));
  shop.filterProducts();
  currentPageProducts.value = 1;
  btnClearSortFilter.style.display = "none";
});

// CATEGORY FILTER

categoryCheckBoxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll(
      'input[name="category-filter-list"]:checked'
    );
    const marckedCheckboxes = Array.from(checkboxes).map(
      (checkbox) => checkbox.id
    );

    shop.categoriesSelected = marckedCheckboxes;
    shop.filterProducts();
    currentPageProducts.value = 1;
    if (checkboxes.length) btnClearCategoryFilter.style.display = "block";
    else btnClearCategoryFilter.style.display = "none";
  });
});

btnClearCategoryFilter.addEventListener("click", () => {
  shop.categoriesSelected = [];
  categoryCheckBoxes.forEach((checkbox) => (checkbox.checked = false));
  shop.filterProducts();
  currentPageProducts.value = 1;
  btnClearCategoryFilter.style.display = "none";
});

// PRICE FILTER

minPriceInput.addEventListener("change", () => {
  const minPrice = parseFloat(minPriceInput.value) || 0;

  if (minPrice >= 0 && minPrice < shop.maxPrice) {
    shop.minPrice = minPrice;
    shop.filterProducts();
    currentPageProducts.value = 1;
  } else {
    minPriceInput.value = shop.minPrice ? shop.minPrice.toString() : "";
  }

  if (minPriceInput.value || maxPriceInput.value)
    btnClearPriceFilter.style.display = "block";
  else btnClearPriceFilter.style.display = "none";
});

maxPriceInput.addEventListener("change", () => {
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

  if (maxPrice > shop.minPrice && maxPriceInput.value !== "0") {
    shop.maxPrice = maxPrice;
    shop.filterProducts();
    currentPageProducts.value = 1;
    btnClearPriceFilter.style.display = "block";
  } else {
    maxPriceInput.value =
      shop.maxPrice != Infinity ? shop.maxPrice.toString() : "";
  }

  if (minPriceInput.value || maxPriceInput.value)
    btnClearPriceFilter.style.display = "block";
  else btnClearPriceFilter.style.display = "none";
});

btnClearPriceFilter.addEventListener("click", () => {
  shop.minPrice = 0;
  shop.maxPrice = Infinity;
  minPriceInput.value = "";
  maxPriceInput.value = "";
  shop.filterProducts();
  currentPageProducts.value = 1;
  btnClearPriceFilter.style.display = "none";
});

// PAGINATION

previusPageProducts.addEventListener("click", () => {
  if (currentPageProducts.value > 1) {
    currentPageProducts.value--;
    shop.currentPage = currentPageProducts.value;
    shop.showProducts();
  }
});

nextPageProducts.addEventListener("click", () => {
  if (currentPageProducts.value < shop.nPages) {
    currentPageProducts.value++;
    shop.currentPage = currentPageProducts.value;
    shop.showProducts();
  }
});

currentPageProducts.addEventListener("change", () => {
  if (
    currentPageProducts.value >= 1 &&
    currentPageProducts.value <= shop.nPages
  ) {
    shop.currentPage = currentPageProducts.value;
    shop.showProducts();
  } else {
    if (currentPageProducts.value < 1) {
      currentPageProducts.value = 1;
      shop.currentPage = currentPageProducts.value;
      shop.showProducts();
    } else {
      if (currentPageProducts.value > shop.nPages) {
        currentPageProducts.value = shop.nPages;
        shop.currentPage = currentPageProducts.value;
        shop.showProducts();
      }
    }
  }
});
