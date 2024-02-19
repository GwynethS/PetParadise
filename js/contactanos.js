import { ShoppingCart } from "./models/shoppingCart.js";
import { activeState } from "./functions/activeState.js";
import { validPattern, validForm, resetForm } from "./functions/form.js";

// SHOPPING CART ELEMENTS
const shoppingCartIconNav = document.getElementById("shopping-cart-icon-nav");
const btnCloseCart = document.getElementById("btn-close-cart");

// FORM ELEMENTS
const contactForm = document.getElementById("contact-form");
const fields = [
  document.getElementById("name-field"),
  document.getElementById("email-field"),
  document.getElementById("message-field"),
];
const [nameField, emailField, messageField] = fields;

const inputs = [
  document.getElementById("input-name"),
  document.getElementById("input-email"),
  document.getElementById("input-message"),
];
const [inputName, inputEmail, inputMessage] = inputs;

const shoppingCart = new ShoppingCart();

activeState();

// SHOPPING CART
shoppingCartIconNav.addEventListener("click", () => {
  shoppingCart.showCartProducts();
  shoppingCart.showCartTotalPayment();
});

btnCloseCart.addEventListener("click", () => {
  shoppingCart.closeCart();
});

// CONTACT FORM

inputName.addEventListener("keyup", () => {
  const pattern = /^[a-zA-Z]{3,}$/;
  validPattern(nameField, inputName, pattern);
});

inputEmail.addEventListener("keyup", () => {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  validPattern(emailField, inputEmail, pattern);
});

inputMessage.addEventListener("keyup", () => {
  if (inputMessage.value.length < 10) {
    messageField.classList.remove("valid");
    messageField.classList.add("error");
  } else {
    messageField.classList.remove("error");
    messageField.classList.add("valid");
  }
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validForm(fields)) {
    alert("Se envió el formulario!");
    resetForm(inputs, fields);
  }
});
