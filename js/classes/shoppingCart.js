export class ShoppingCart {
  constructor() {
    this.cartBlockContainer = document.getElementById("cart-block-container");
    this.cartItemssContainer = document.getElementById("cart-items-container");
    this.cartTotalPriceElement = document.getElementById("cart-total-price");
    this.products = this.getProductsFormSessionStorage();
    this.totalPayment = 0;
  }

  openCart() {
    this.cartBlockContainer.style.display = "block";
  }

  closeCart() {
    this.cartBlockContainer.style.display = "none";
  }

  saveInSessionStorage(){
    sessionStorage.setItem("cartProducts", JSON.stringify(this.products));
  }

  getProductsFormSessionStorage(){
    return JSON.parse(sessionStorage.getItem("cartProducts")) || [];
  }

  updateProducts(){
    this.products = this.getProductsFormSessionStorage();
    console.log(this.products);
  }

  addProduct(product) {
    this.updateProducts();
    console.log("ADD:", this.products)
    const productInCart = this.products.find((item) => item.id === product.id);

    if (productInCart) {
      const productInCartIndex = this.products.indexOf(productInCart);
      console.log(this.products[productInCartIndex]);
      this.products[productInCartIndex].quantity += 1;
      console.log(this.products[productInCartIndex]);
      this.products[productInCartIndex].subTotal = productInCart.quantity * productInCart.price;
    } else {
      const newProduct = {
        ...product,
        quantity: 1,
        subTotal: product.price,
      };

      this.products.push(newProduct);
    }
    this.showCartProducts();
    this.showCartTotalPayment();
    this.saveInSessionStorage();
  }

  removeProduct(product) {
    const productIndex = this.products.indexOf(product);

    if (productIndex != -1) {
      this.products.splice(productIndex, 1);
    }
  }

  onCheckout() {
    this.products = [];
    this.totalPayment = 0;
    alert("Gracias por tu compra.");
  }

  updateQuantityProducts(div, inputValue, product){
    product.quantity = inputValue;
    product.subTotal = product.quantity * product.price;

    div.querySelector(".product-subtotal p").textContent = `S/. ${product.subTotal}`;
    this.showCartTotalPayment();
    this.saveInSessionStorage();
  }

  showCartProducts() {
    this.cartItemssContainer.innerHTML = "";
    console.log("SHOW: ",this.products);
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
          this.updateQuantityProducts(div, inputProductQuantityValue, product);
        }
      });

      btnPlus.addEventListener("click", () => {
        inputProductQuantity.value = ++inputProductQuantityValue;
        this.updateQuantityProducts(div, inputProductQuantityValue, product);
      });

      inputProductQuantity.addEventListener("change", () =>{
        inputProductQuantity.value = inputProductQuantityValue > 0 ? inputProductQuantityValue : 1;
        this.updateQuantityProducts(div, inputProductQuantity, product);
      })

      let btnRemoveCartProduct = document.getElementById(`btn-remove-cart-product-${product.id}`);

      btnRemoveCartProduct.addEventListener("click", () => {
        this.removeProduct(product);
        div.remove();
        this.showCartTotalPayment();
        this.saveInSessionStorage();
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
}