export function setCategoryShopFilters(category) {
  sessionStorage.setItem("categorySelected", JSON.stringify(category));
  window.location.href = "./pages/tienda.html";
}

export function loadCategoryFilterChecked(categoryCheckBoxes, btnClearCategoryFilter) {
  const categorySelected = JSON.parse(sessionStorage.getItem("categorySelected"));
  
  if (categorySelected) {
    btnClearCategoryFilter.style.display = "block";
    
    switch (categorySelected[0]) {
      case "clothes":
        categoryCheckBoxes[0].checked = true;
        break;
      case "accessories":
        categoryCheckBoxes[1].checked = true;
        break;
      case "toys":
        categoryCheckBoxes[2].checked = true;
        break;
      case "food":
        categoryCheckBoxes[3].checked = true;
        break;
    }
  }

  sessionStorage.removeItem("categorySelected");
}

export function searchProduct(shop, searchBarInput) {
  const text = searchBarInput.value.trim();
  shop.searchByName = text;
  shop.filterProducts();
}
