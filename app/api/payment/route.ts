//Aqui recibiremos los avisos una vez que se concrete un pago en MERCADO PAGO
import type { NextRequest } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { connection } from "../../utils/models/db";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  if (request.nextUrl.searchParams.get("topic") !== "payment")
    return Response.json({ success: true }); //Siempre informar a MP que recibi la notificacion.
  if (request.nextUrl.searchParams.get("source_news") !== "ipn")
    return Response.json({ success: true });

  const paymentId = request.nextUrl.searchParams.get("id");

  console.log(paymentId);

  new Promise<void>(async (resolve, reject) => {
    try {
      const payment = await new Payment(mercadopago).get({
        id: parseFloat(paymentId!),
      });
      if (payment.status != "approved") {
        return Response.json({ success: true });
      }

      const pedido = {
        id: payment.id,
        amount: payment.transaction_amount,
        net_amount: payment.transaction_details?.net_received_amount,
        message: payment.description,
        status: payment.status,
        payer_email: payment.payer?.email,
        payer_first_name: payment.payer?.first_name,
        payer_last_name: payment.payer?.last_name,
        payer_dni: payment.payer?.identification?.number,
        payer_phone:
          payment.payer?.phone?.area_code + "-" + payment.payer?.phone?.number,
        cart: JSON.stringify(payment.metadata.cart),
        option: payment.metadata?.option,
        name: payment.metadata?.name,
        address: payment.metadata?.address,
        //y demas info que sea necesaria
      };
      /* console.log("===== PAYMENT=======");
      console.log(payment); */
      console.log("===== PEDIDO=======");
      console.log(pedido);

      try {
        const resultPedido = await connection.query<any>(
          `INSERT INTO Pedido (pago, modo_entrega_id, mp_id, payer_first_name, payer_last_name, payer_dni, payer_phone, payer_email, payer_adress, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            true,
            pedido.option === "delivery" ? 1 : 2,
            pedido.id,
            pedido.payer_first_name,
            pedido.payer_last_name,
            pedido.payer_dni,
            pedido.payer_phone,
            pedido.payer_email,
            pedido.address,
            pedido.amount,
          ]
        );
        console.log("Pedido insertado en la base de datos:", resultPedido);
        const pedidoCart = JSON.parse(pedido.cart);
        for (const item of pedidoCart) {
          await connection.query<any>(
            `INSERT INTO Pedido_Productos (pedido_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)`,
            [resultPedido.insertId, item.id, item.cantidad]
          );
        }
      } catch (error) {
        console.error("Error al insertar pedido en la base de datos:", error);
        return Response.json({ success: false });
      }
    } catch (error) {
      console.error("Error al obtener el pago de MP:", error);
      return Response.json({ success: false });
    }
  });

  //Es importante que en paralelo a la promise que se ejecuta arriba se le envie a MP el response OK, ya que hay un tiempo limite para informarles que recibimos la notificacion
  return Response.json({ success: true });
}
