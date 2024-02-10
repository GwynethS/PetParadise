import { stockProducts } from "../data/stockProducts.js";
import { ShoppingCart } from "./shoppingCart.js";

const shoppingCart = new ShoppingCart();

export class Shop {
  constructor() {
    this.container = document.getElementById("shop-products-container");
    this.pagination = document.getElementById("pagination-shop");
    this.products = stockProducts;
    this.filterProductsList = [];
    this.orderSelected =
      JSON.parse(sessionStorage.getItem("filters"))?.orderSelected || "";
    this.minPrice =
      JSON.parse(sessionStorage.getItem("filters"))?.minPrice || 0;
    this.maxPrice =
      JSON.parse(sessionStorage.getItem("filters"))?.maxPrice || Infinity;
    this.categoriesSelected =
      JSON.parse(sessionStorage.getItem("filters"))?.categoriesSelected || [];
    this.searchByName =
      JSON.parse(sessionStorage.getItem("filters"))?.searchByName || "";
    this.currentPage = 1;
    this.nPages = Math.ceil(stockProducts.length / 16);

    if (this.filterIsActive()) this.filterProducts();
    else this.showProducts();
  }

  filterIsActive() {
    if (
      this.orderSelected ||
      this.minPrice ||
      this.maxPrice != Infinity ||
      this.categoriesSelected.length ||
      this.searchByName
    )
      return true;
    else return false;
  }

  saveFiltersInSessionStorage() {
    sessionStorage.setItem(
      "filters",
      JSON.stringify({
        orderSelected: this.orderSelected,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        categoriesSelected: this.categoriesSelected,
        searchByName: this.searchByName,
      })
    );
  }

  updateNPages() {
    this.nPages = Math.ceil(
      (this.filterProducts.length == 0
        ? this.products.length
        : this.filterProducts.length) / 16
    );
  }

  showProducts() {
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card) => card.remove());

    const startIndex = (this.currentPage - 1) * 16;
    const endIndex = startIndex + 16;
    const productsPerPage = (
      this.filterProductsList.length == 0
        ? this.products
        : this.filterProductsList
    ).slice(startIndex, endIndex);

    this.nPages = Math.ceil(
      (this.filterProductsList.length == 0
        ? this.products
        : this.filterProductsList
      ).length / 16
    );

    productsPerPage.forEach((product) => {
      let div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `
        <figure><img src=${product.imgUrl}></figure>
        <div class="product-info">
            <h4>${product.name}</h4>
            <p> S/. ${product.price}</p>
            <button id="btn-add-cart-${product.id}" class="btn-add-cart">Agregar</button>
        </div>
      `;
      this.container.insertBefore(div, this.pagination);
      let buttonAddCart = document.getElementById(`btn-add-cart-${product.id}`);
      buttonAddCart.addEventListener("click", () =>
        shoppingCart.addProduct(product)
      );
    });
  }

  searchProductById(id) {
    return this.products.find((item) => item.id === id);
  }

  filterProducts() {
    let productList = [...this.products];

    if (this.searchByName) {
      productList = productList.filter((product) =>
        product.name.toLowerCase().includes(this.searchByName.toLowerCase())
      );
    }

    if (this.categoriesSelected.length) {
      productList = productList.filter((product) =>
        this.categoriesSelected.includes(product.category)
      );
    }

    if (this.minPrice) {
      productList = productList.filter((item) => item.price >= this.minPrice);
    }

    if (this.maxPrice != Infinity) {
      productList = productList.filter((item) => item.price <= this.maxPrice);
    }

    if (this.orderSelected === "DSC") {
      productList.sort((a, b) => b.price - a.price);
    } else if (this.orderSelected === "ASC") {
      productList.sort((a, b) => a.price - b.price);
    }

    this.filterProductsList = productList;
    this.saveFiltersInSessionStorage();
    this.showProducts();
  }
}
