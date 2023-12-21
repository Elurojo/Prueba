import { productos } from "./products.js";
export default class Cart {
  constructor() {}
}

// Exporta la clase para que pueda ser utilizada en otros archivos

// TODO ESTO ES PARA QUE TOME LAS IMAGES DE PRODUCT Y LAS PUEDAS VER
// Y ADEMAS ESE LET CART ES QUE CADA VEZ QUE APRETES EN COMPRAR SE ALMACENE EN ALGUN LUGAR
const shopContent = document.getElementById("shopContent");

let cart1 = [];
productos.forEach((product) => {
  const content = document.createElement("div");
  content.innerHTML = `
    <img src="/Img/${product.img}">
    <h3>${product.productName}</h3>
    <p class="price">${product.price} $</p>
    <button class="button button_1">Comprar</button>
    `;
  shopContent.append(content);

  const byButton = content.querySelector(".button");
  byButton.addEventListener(
    "click",
    (function (product) {
      return function () {
        const repeat = cart1.some(
          (repeatProduct) => repeatProduct.id === product.id,
        );
        if (repeat) {
          cart1.map((prod) => {
            if (prod.id === product.id) {
              prod.quanty++;
              displayCartCounter();
            }
          });
        } else {
          cart1.push({
            id: product.id,
            productName: product.productName,
            price: product.price,
            quanty: product.quanty,
            img: product.img,
          });
          displayCartCounter();
        }
        console.log(cart1);
      };
    })(product),
  );
});

// ACA EMPIEZA TODO LO QUE TIENE QUE VER CON EL CARRITO Y EL MODAL
document.addEventListener("DOMContentLoaded", function () {
  // Tu código aquí
});

const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");

const cartBtn = document.getElementById("cart-btn");

const displayCart = () => {
  //modal header
  modalContainer.innerHTML = "";
  modalContainer.style.display = "block";
  modalOverlay.style.display = "block";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const modalClose = document.createElement("i");
  modalClose.className = "bi bi-x";
  modalClose.setAttribute("aria-label", "Close");
  modalHeader.appendChild(modalClose);

  modalClose.addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
  });

  const modalTitle = document.createElement("h2");
  modalTitle.innerText = "Mi Carrito";

  modalHeader.append(modalTitle);

  modalContainer.append(modalHeader);
  // Modal body
  cart1.forEach((product) => {
    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalBody.innerHTML = `
    <div class = "product">
    <img class = "product-img" src = "/Img/${product.img}" />
        <div class = "product-info">
          <h4>${product.productName}</h4>
        </div>
        <div class="master-container">
        <div class="cart">
        <div class = "quantity">
          <span class = "quantity-btn-decrese"><i class="bi bi-dash menos-menos"></i></span>
          <span class = "quantity-input">${product.quanty}</span>
          <span class = "quantity-btn-increse"><i class="bi bi-plus more-mas"></i></span>
        </div>
        </div>
        </div>
        <div class = "price">${product.price * product.quanty} $</div>
        <div class = "delete-product">
            <i class="bi bi-x"></i>
        </div>
    </div>
    `;
    modalContainer.append(modalBody);

    // FUNCION PARA RESTAR PRODUCTOS

    const decrese = modalBody.querySelector(".quantity-btn-decrese");
    decrese.addEventListener("click", () => {
      if (product.quanty !== 1) {
        product.quanty--;
        displayCart();
        displayCartCounter(); // para que tome el contador
      }
    });

    // FUNCION PARA ACTUALIZAR EL CONTADOR DEL CARRITO
    const displayCartCounter = () => {
      const counter = document.querySelector(".cart-counter");
      if (counter) {
        counter.textContent = cart1.length;
        counter.style.display = cart1.length > 0 ? "block" : "none";
      }
    };

    // FUNCION PARA ELIMINAR PRODUCTOS
    const deleteCartProduct = (id) => {
      const foundId = cart1.findIndex((element) => element.id === id);
      if (foundId !== -1) {
        cart1.splice(foundId, 1);
        displayCart();
        displayCartCounter(); // para que tome el contador
      }
    };

    // FUNCION PARA SUMAR PRODUCTOS
    const increse = modalBody.querySelector(".quantity-btn-increse");
    increse.addEventListener("click", function () {
      increse.addEventListener(
        "click",
        (function (id) {
          const currentProduct = cart1.find((product) => product.id === id);
          if (currentProduct) {
            currentProduct.quanty++;
            displayCart();
            displayCartCounter(); // para que tome el contador
          }
        })(product.id),
      );
    });

    // BORRAR PRODUCTOS
    const deleteProduct = modalBody.querySelector(".delete-product");
    deleteProduct.addEventListener("click", () => {
      deleteCartProduct(product.id);
    });
  });

  //MODAL FOOTER
  const total = obtenerTotal();

  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";
  modalFooter.innerHTML = `
 <div class = "total-price">Total: ${total} $</div>
 <button class="btn-primary" id="checkout-btn"> Pagar </button>
 <div id="wallet_container"></div>
 `;

  modalContainer.append(modalFooter);
};

cartBtn.addEventListener("click", displayCart);

export const obtenerTotal = () => {
  const total = cart1.reduce((acc, el) => acc + el.price * el.quanty, 0);
  return total;
};

// FUNCION PARA ELIMINAR PRODUCTOS
const deleteCartProduct = (id) => {
  const foundId = cart1.findIndex((element) => element.id === id);
  cart1.splice(foundId, 1);
  displayCart();
  displayCartCounter(); // para que tome el contador
};

//CONTADOR DE PRODUCTOS
const cartCounter = document.querySelector("#cart-counter");

const displayCartCounter = () => {
  const carteLength = cart1.reduce((acc, el) => acc + el.quanty, 0);
  if (carteLength > 0) {
    cartCounter.style.display = "block";
    cartCounter.innerText = carteLength;
  } else {
    cartCounter.style.display = "none";
  }
};