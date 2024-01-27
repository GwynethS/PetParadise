const stockProducts = [
  {
    id: 1,
    name: "Abrigo de Invierno",
    price: 50,
    category: "ropa",
  },
  {
    id: 2,
    name: "Collar Elegante",
    price: 20,
    category: "accesorios",
  },
  {
    id: 3,
    name: "Juguete Interactivo",
    price: 15,
    category: "juguetes",
  },
  {
    id: 4,
    name: "Comida Premium para Gatos",
    price: 30,
    category: "comida",
  },
];

class Shop{
  constructor(){
    this.products = stockProducts;
  }

  showProducts(productList){
    productList.forEach(product => {
      console.log(product);
    });
  }

  searchProductById(id){
    return this.products.find(item => item.id === id);
  }

  filterProducts(categorySelected, orderSelected, minPrice, maxPrice){
    const productList = this.products;

    if(categorySelected){
      productList = productList.filter(item => item.categoria === categorySelected);
    }

    if(minPrice){
      productList = productList.filter(item => item.price >= minPrice);
    }

    if(maxPrice){
      productList = productList.filter(item => item.price <= maxPrice);
    }

    if(orderSelected === "DSC"){
      productList = productList.sort((a, b) => b.price - a.price);
    }else if (orderSelected === "ASC"){
      productList = productList.sort((a, b) => a.price - b.price);
    }

    this.showProducts(productList);
  }
}

class ShoppingCart{
  constructor(){
    this.products = [];
    this.totalPayment = 0;
  }

  addProduct(product){
    const productInCart = this.products.find(item => item.id === product.id)
    const productInCartIndex = this.products.indexOf(productInCart);

    if(productInCart){
      this.products[productInCartIndex].quantity += 1;
      this.products[productInCartIndex].subTotal = productInCart.quantity * productInCart.price;
    }else{
      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        subTotal: product.price
      };

      this.products.push(newProduct);
    }

    this.calculateTotal();
  }

  removeProduct(product){
    const productIndex = this.products.indexOf(product);

    if(productIndex != -1){
      this.products.splice(productIndex, 1);
    }
    
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPayment = this.products.reduce((total, product) => total + product.subTotal, 0);
  }

  updateProductQuantity(productId, newQuantity){
    const productToUpdate = this.products.some(item => item.id === productId);

    if(productToUpdate){
      productToUpdate.quantity = newQuantity;
      productToUpdate.subTotal = productToUpdate.price * productToUpdate.quantity;

      this.calculateTotal()
    }
  }

  onCheckout(){
    this.products = [];
    this.totalPayment = 0;
    alert("Gracias por tu compra.");
  }

  showCartProducts(){
    this.products.forEach(product => {
      console.log(product);
    });
  }

  showCartTotalPayment(){
    alert(`Total a pagar: ${this.totalPayment}`);
  }
}

const shop = new Shop();
const shoppingCart = new ShoppingCart();

function addProductsToCart(){
  shop.showProducts(shop.products);

  let productsId;
  
  do{
    productsId = prompt("Escriba el ID de los productos que quiere agregar al carrito separados por un espacio.\nLos productos se muestran en la consola.");
  }while(!productsId);

  let productIdArray = productsId.split(" ");

  productIdArray.forEach(id => {
    let productSelected = shop.searchProductById(Number(id));

    shoppingCart.addProduct(productSelected);
  });
}

function calculateTotalPayment(){
  console.log("Productos del carrito:");
  shoppingCart.showCartProducts();

  shoppingCart.calculateTotal();
  shoppingCart.showCartTotalPayment();
  let checkout = confirm("Desea confirmar la compra?");

  if(checkout){
    shoppingCart.onCheckout();
  }
}

addProductsToCart();
calculateTotalPayment();