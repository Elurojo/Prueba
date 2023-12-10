const mp = new MercadoPago('TEST-36935584-a5eb-42dd-9b4c-0a69af8a8ce5',{
    locale: "es-AR",
});

document.getElementById("checkout-btn").addEventListener("click", async () => {
    try { 
        const orderData = {
            title: document.querySelector(".name").innerText,
            quantity: 1,
            price: 100,
        };
  
        const response = await fetch("http://localhost:3000/create_preference", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(orderData),
         });
         
        const preference = await response.json();
        createCheckoutButton(preference.id);             //CREA BOTON DE MERCADO PAGO
    } catch (error) {
       alert("error :(");
    }
 });
 
 const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
    if(window.checkoutButton) window.checkoutButton.unmount();   

     await bricksBuilder.create("wallet", "wallet_container", {
        initialization: {
            preferenceId: preferenceId,
        },
    });
};

    renderComponent();
 };