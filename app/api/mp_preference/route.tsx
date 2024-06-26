import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';


const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(req:any){
  
  try{
    const compra = await req.json();
    const body = {
      items:[
        {
          //Aca va la info del carrito
          id:compra.id,
          category_id: "Resto",
          description:"Pizza 3",
          title: compra.title,
          quantity: compra.quantity,
          unit_price: compra.unit_price,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SITE}/success`,
        failure: `${process.env.NEXT_PUBLIC_SITE}/failure`,
        pending: `${process.env.NEXT_PUBLIC_SITE}/pending`
      },
      notification_url: process.env.MP_NOTIFICATION_URL,
      external_reference: "id_cliente", //para relacionar con dato interno
      metadata:{
        //aca puedo indicar info que me sirva para trabajar luego q se procese el pago, ya que estara incluida en la respuesta del payment
        cart: compra.cart,
        option: compra.option,
        name: compra.name,
        address: compra.address,
      },
      auto_return: "approved",

    }  
    const preference = await new Preference(client);
    const result = await preference
        .create({ body })   // Enviar la preferencia como respuesta      
    
    /* if (result.id !== undefined){
      redirect(result.init_point!);
    } */     
    return NextResponse.json({result},{status: 200}); 
  }
   catch(err) {
    console.error("Error al procesar la solicitud:", err);
    return NextResponse.json("Error interno del servidor", { status: 500 });
  } 
}