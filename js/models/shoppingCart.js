export class ShoppingCart {
  constructor() {
    this.shopingCartIconQuantity = document.getElementById("shopping-cart-icon-quantity");
    this.shopingCartIconQuantity.value = localStorage.getItem("cart-icon-quantity") || 0;
    this.cartBlockContainer = document.getElementById("cart-block-container");
    this.cartItemssContainer = document.getElementById("cart-items-container");
    this.cartTotalPriceElement = document.getElementById("cart-total-price");
    this.products = this.getProductsFromLocalStorage();
    this.totalPayment = 0;
  }

  openCart() {
    this.cartBlockContainer.style.display = "block";
  }

  closeCart() {
    this.cartBlockContainer.style.display = "none";
  }

  saveInLocalStorage(){
    localStorage.setItem("cartProducts", JSON.stringify(this.products));
    localStorage.setItem("cart-icon-quantity", this.shopingCartIconQuantity.value);
  }

  getProductsFromLocalStorage(){
    return JSON.parse(localStorage.getItem("cartProducts")) || [];
  }

  updateProducts(){
    this.products = this.getProductsFromLocalStorage();
  }

  updateShoppingCartIconQuantity(newValue){
    this.shopingCartIconQuantity.value = newValue;
  }

  addProduct(product) {
    this.updateProducts();
    const productInCart = this.products.find((item) => item.id === product.id);

    if (productInCart) {
      const productInCartIndex = this.products.indexOf(productInCart);
      this.products[productInCartIndex].quantity += 1;
      this.products[productInCartIndex].subTotal = productInCart.quantity * productInCart.price;
    } else {
      const newProduct = {
        ...product,
        quantity: 1,
        subTotal: product.price,
      };

      this.products.push(newProduct);
    }

    const newCartIconValue = Number(this.shopingCartIconQuantity.value) + 1;
    this.updateShoppingCartIconQuantity(newCartIconValue);
    this.saveInLocalStorage();
  }

  removeProduct(product) {
    const productIndex = this.products.indexOf(product);
    const newCartIconValue = Number(this.shopingCartIconQuantity.value) - product.quantity;
    this.updateShoppingCartIconQuantity(newCartIconValue);

    if (productIndex != -1) {
      this.products.splice(productIndex, 1);
    }
  }

  updateQuantityProducts(div, inputValue, product){
    product.quantity = inputValue;
    product.subTotal = product.quantity * product.price;

    div.querySelector(".product-subtotal p").textContent = `S/. ${product.subTotal}`;
    this.showCartTotalPayment();
    this.saveInLocalStorage();
  }

  showCartProducts() {
    this.cartItemssContainer.innerHTML = "";
    this.products.forEach((product) => {
      let div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <figure><img src="${product.imgUrl}"></figure>
        <div class="product-info">
            <p>${product.name}</p>
            <p>S/. ${product.price}</p>
        </div>
        <div class="product-quantity">
            <button id="btn-minus-quantity-${product.id}" class="btn-minus"><i class="fa-solid fa-minus"></i></button>
            <input id="input-product-quantity-${product.id}" type="number" value="${product.quantity}">
            <button id="btn-plus-quantity-${product.id}" class="btn-plus"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="product-subtotal">
            <p>S/. ${product.subTotal}</p>
        </div>
        <div class="product-remove">
            <button id="btn-remove-cart-product-${product.id}"><i class="fa-solid fa-trash"></i></button>
        </div>`;

      this.cartItemssContainer.append(div);

      let btnMinus = document.getElementById(`btn-minus-quantity-${product.id}`);
      let btnPlus = document.getElementById(`btn-plus-quantity-${product.id}`);
      let inputProductQuantity = document.getElementById(`input-product-quantity-${product.id}`);
      let inputProductQuantityValue = Number(inputProductQuantity.value);

      btnMinus.addEventListener("click", () => {
        if (inputProductQuantityValue > 1) {
          inputProductQuantity.value = --inputProductQuantityValue;

          const newCartIconValue = Number(this.shopingCartIconQuantity.value) - 1;
          this.updateShoppingCartIconQuantity(newCartIconValue);
          this.updateQuantityProducts(div, inputProductQuantityValue, product);
        }
      });

      btnPlus.addEventListener("click", () => {
        inputProductQuantity.value = ++inputProductQuantityValue;

        const newCartIconValue = Number(this.shopingCartIconQuantity.value) + 1;
        this.updateShoppingCartIconQuantity(newCartIconValue);
        this.updateQuantityProducts(div, inputProductQuantityValue, product);
      });

      inputProductQuantity.addEventListener("change", () =>{
        const value = Number(inputProductQuantity.value);

        if(value > 0){
          inputProductQuantity.value = value;
          inputProductQuantityValue = value;
        }else{
          inputProductQuantity.value = 1;
          inputProductQuantityValue = 1;
        }
        const newCartIconValue = Number(this.shopingCartIconQuantity.value) + (inputProductQuantityValue - product.quantity);
        this.updateShoppingCartIconQuantity(newCartIconValue);
        this.updateQuantityProducts(div, inputProductQuantityValue, product);
      })

      let btnRemoveCartProduct = document.getElementById(`btn-remove-cart-product-${product.id}`);

      btnRemoveCartProduct.addEventListener("click", () => {
        this.removeProduct(product);
        div.remove();
        this.showCartTotalPayment();
        this.saveInLocalStorage();
      });
    });
    this.openCart();
  }

  showCartTotalPayment() {
    this.totalPayment = this.products.reduce(
      (total, product) => total + product.subTotal,
      0
    );

    this.cartTotalPriceElement.innerText = `S/. ${this.totalPayment}`;
  }

  onCheckout(){
    this.products = [];
    this.shopingCartIconQuantity.value = 0;
    localStorage.removeItem("cartProducts");
    localStorage.setItem("cart-icon-quantity", this.shopingCartIconQuantity.value);
    this.closeCart();
    alert("Gracias por tu compra!");
  }
}