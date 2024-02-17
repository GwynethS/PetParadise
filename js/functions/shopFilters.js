export function setCategoryShopFilters(category){
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

export function loadFiltersChecked(shop, orderByRadioButtons, categoryCheckBoxes){
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


export function searchProduct(){
  const text = searchBarInput.value.trim();
  shop.searchByName = text;
  shop.filterProducts();
}