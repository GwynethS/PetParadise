import { Shop } from "./classes/shop.js";
import { ShoppingCart } from "./classes/shoppingCart.js";


//SHOPPING CART ELEMENTS
const shoppingCartIconNav = document.getElementById("shopping-cart-icon-nav");
const btnCloseCart = document.getElementById("btn-close-cart");

//PAGINATION ELEMENTS
const previusPageProducts = document.getElementById(
  "btn-previous-page-products"
);
const nextPageProducts = document.getElementById("btn-next-page-products");
const currentPageProducts = document.getElementById("current-page-products");

const orderByRadioButtons = document.querySelectorAll('input[name="order-by-list"]');
const categoryCheckBoxes = document.querySelectorAll('input[name="category-filter-list"]');

const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");

const searchBarInput = document.getElementById("input-search-bar");
const btnSearchBar = document.getElementById("btn-search-bar");

const shop = new Shop();
const shoppingCart = new ShoppingCart();

function loadFiltersChecked(){
  if(shop.filterIsActive()){
    const filters = JSON.parse(sessionStorage.getItem("filters"));

    if(filters.orderSelected){
      (filters.orderSelected === "DSC" ? orderByRadioButtons[0] : orderByRadioButtons[1]).checked = true;
    }
    
    if(filters.categoriesSelected.length){
      if(filters.categoriesSelected.includes("clothes")) categoryCheckBoxes[0].checked = true;
      if(filters.categoriesSelected.includes("accessories")) categoryCheckBoxes[1].checked = true;
      if(filters.categoriesSelected.includes("toys")) categoryCheckBoxes[2].checked = true;
      if(filters.categoriesSelected.includes("food")) categoryCheckBoxes[3].checked = true;
    }

    if(filters.minPrice){
      minPriceInput.value = filters.minPrice;
    }

    if(filters.maxPrice){
      maxPriceInput.value = filters.maxPrice;
    }

    if(filters.searchByName){
      searchBarInput.value = filters.searchByName;
    }
  }
}

loadFiltersChecked();

function searchProduct(){
  const text = searchBarInput.value.trim();
  shop.searchByName = text;
  shop.filterProducts();
}

searchBarInput.addEventListener("keyup", (event) => {
  if(event.key === "Enter" || !searchBarInput.value) searchProduct();
});

btnSearchBar.addEventListener("click", searchProduct);

orderByRadioButtons.forEach(button => {
  button.addEventListener('change', (event) => {
    const selectedValue = event.target.id;
    shop.orderSelected = selectedValue;
    shop.filterProducts();
  });
});

categoryCheckBoxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const checkboxes = document.querySelectorAll('input[name="category-filter-list"]:checked');
    const marckedCheckboxes = Array.from(checkboxes).map(checkbox => checkbox.id);

    shop.categoriesSelected = marckedCheckboxes;
    shop.filterProducts();
  })
});

minPriceInput.addEventListener('change', () => {
  const minPrice = parseFloat(minPriceInput.value) || 0;

  if(minPrice <= 0) minPriceInput.value = "";
  if(minPrice < shop.maxPrice){
    shop.minPrice = minPrice;
    shop.filterProducts();
  }else{
    minPriceInput.value = shop.minPrice ? shop.minPrice.toString() : ""; 
  }

});
maxPriceInput.addEventListener('change', () => {
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

  if(maxPrice <= 0) maxPriceInput.value = "";
  if(maxPrice > shop.minPrice){
    shop.maxPrice = maxPrice;
    shop.filterProducts();
  }else{
    maxPriceInput.value = shop.maxPrice != Infinity ? shop.maxPrice.toString() : ""; 
  }
});


shoppingCartIconNav.addEventListener("click", () => {
  shoppingCart.showCartProducts();
  shoppingCart.showCartTotalPayment();
});

btnCloseCart.addEventListener("click", () => {
  shoppingCart.closeCart();
});

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
  if (currentPageProducts.value >= 1 && currentPageProducts.value <= shop.nPages) {
    shop.currentPage = currentPageProducts.value;
    shop.showProducts();
  }else{
    if(currentPageProducts.value < 1){
      currentPageProducts.value = 1;
      shop.currentPage = currentPageProducts.value;
      shop.showProducts();
    }else{
      if(currentPageProducts.value > shop.nPages){
        currentPageProducts.value = shop.nPages;
        shop.currentPage = currentPageProducts.value;
        shop.showProducts();
      }
    }
  }
});
