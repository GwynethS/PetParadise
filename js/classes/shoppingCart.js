export class ShoppingCart {
  constructor() {
    this.cartBlockContainer = document.getElementById("cart-block-container");
    this.cartItemssContainer = document.getElementById("cart-items-container");
    this.cartTotalPriceElement = document.getElementById("cart-total-price");
    this.products = JSON.parse(sessionStorage.getItem("cartProducts")) || [];
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

  getProductsFormLocalStorage(){
    this.products = JSON.parse(sessionStorage.getItem("cartProducts")) || [];
  }

  addProduct(product) {
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
      let inputProductQuantity = document.getElementById(
        `input-product-quantity-${product.id}`
      );

      btnMinus.addEventListener("click", () => {
        if (inputProductQuantity.value > 1) {
          inputProductQuantity.value--;
          product.quantity = inputProductQuantity.value;
          product.subTotal = product.quantity * product.price;

          div.querySelector(".product-subtotal p").textContent = `S/. ${product.subTotal}`;
          this.showCartTotalPayment();
          this.saveInSessionStorage();
        }
      });

      btnPlus.addEventListener("click", () => {
        inputProductQuantity.value++;
        product.quantity = inputProductQuantity.value;
        product.subTotal = product.quantity * product.price;

        div.querySelector(".product-subtotal p").textContent = `S/. ${product.subTotal}`;
        this.showCartTotalPayment();
        this.saveInSessionStorage();
      });

      inputProductQuantity.addEventListener("change", () =>{
        if (inputProductQuantity.value > 0) {
          product.quantity = inputProductQuantity.value;
          product.subTotal = product.quantity * product.price;

          div.querySelector(".product-subtotal p").textContent = `S/. ${product.subTotal}`;
          this.showCartTotalPayment();
          this.saveInSessionStorage();
        }
        else{
          inputProductQuantity.value = 1;
          product.quantity = inputProductQuantity.value;
          product.subTotal = product.quantity * product.price;

          div.querySelector(".product-subtotal p").textContent = `S/. ${product.subTotal}`;
          this.showCartTotalPayment();
          this.saveInSessionStorage();
        }
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