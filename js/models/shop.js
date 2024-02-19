import { stockProducts } from "../data/stockProducts.js";
import { ShoppingCart } from "./shoppingCart.js";

const shoppingCart = new ShoppingCart();

export class Shop {
  constructor() {
    this.container = document.getElementById("shop-products-container");
    this.pagination = document.getElementById("pagination-shop");
    this.products = [...stockProducts];
    this.filterProductsList = [...this.products];
    this.orderSelected = "";
    this.minPrice = 0;
    this.maxPrice = Infinity;
    this.categoriesSelected = JSON.parse(sessionStorage.getItem("categorySelected")) || [];
    this.searchByName = "";
    this.currentPage = 1;
    this.productsPerPage = 12;
    this.nPages = Math.ceil(this.products.length / this.productsPerPage);

    this.categoriesSelected.length ? this.filterProducts() : this.showProducts();
  }

  updateNPages() {
    this.nPages = Math.ceil(
      (this.filterProducts.length == 0
        ? this.products.length
        : this.filterProducts.length) / this.productsPerPage
    );
  }

  showProducts() {
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card) => card.remove());

    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    const productsPerPageList = this.filterProductsList.slice(startIndex, endIndex);

    this.nPages = Math.ceil(
      (this.filterProductsList.length == 0
        ? this.products
        : this.filterProductsList
      ).length / this.productsPerPage
    );

    productsPerPageList.forEach((product) => {
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
    this.showProducts();
  }
}
