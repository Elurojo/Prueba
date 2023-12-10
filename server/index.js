import express from "express";
import cors from "cors";

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'TEST-8842607211755702-120821-e414ad33d56c622e6105e47c9513e315-290111161' });

const app = express()
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
 res.send("Soy el server :)");
});

app.post("/create_preference", async (req,res)=>{
 try{
    const body = {
        items: [
            {
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id: "ARS",
            },
        ],
        back_urls:{
            success:"https://www.youtube.com/@midulive",
            failure:"https://www.youtube.com/@midulive",
            pending:"https://www.youtube.com/@midulive",
        },
        auto_return:"approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({body});
    res.json({
        id: result.id,
    });
 }catch(error){
    console.log(error);
    res.status(500).json({
        error: error.message
    });
 }
});

app.listen(port, ()=>{
 console.log(`El servidor esta corriendo en el puerto ${port}`);
});
