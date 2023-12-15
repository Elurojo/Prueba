document.addEventListener("DOMContentLoaded", function() {
    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer"
    modalFooter.innerHTML = `
    <div class = "total-price">Total: ${total} $</div>
    <button class="btn-primary" id="checkout-btn"> Pagar </button>
    <div id="wallet_container"></div>
    `;
 });
 