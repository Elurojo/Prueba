// Espera hasta que el botón de pago se haya creado en el DOM
var observer = new MutationObserver(async function(mutations) {
    var checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn && !checkoutBtn.hasAttribute('data-listener-attached')) {
    checkoutBtn.setAttribute('data-listener-attached', 'true');
    checkoutBtn.addEventListener("click", async () => {
    const mp = new MercadoPago('APP_USR-b538f931-6d23-49e4-9da5-f42f7308dd32',{
      locale: "es-AR",
    });
    
    try { 
      const orderData = {
          title: "compra online",
          quantity: 1,
          price: total, // Asegúrate de que 'total' esté definido aquí
      };
   
      const response = await fetch("http://localhost:3000/create_preference", {
          method: "POST",
          headers: {
             "Content-type": "application/json",
          },
          body: JSON.stringify(orderData),
       });
       
      const preference = await response.json();
      createCheckoutButton(preference.id);    //CREA BOTON DE MERCADO PAGO
    } catch (error) {
     alert("error :(");
    }
    });
    }
   });
   
   observer.observe(document, {attributes: false, childList: true, characterData: false, subtree:true});
   
   // Ahora puedes acceder al botón de pago
   window.onload = function() {
    var checkoutBtn = document.getElementById("checkout-btn");
    console.log(checkoutBtn); // Debería imprimir el botón de pago, no null
   }
   