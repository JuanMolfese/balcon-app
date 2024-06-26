"use client"
import { Badge } from "@/components/ui/badge";
import { fetchStatus } from "../../utils/actions/pedidos/status/fetchs"
import Link from "next/link";
import { useGetPedidosQuery } from "@/redux/services/ordersApi";
import { BadgeDollarSign, HandPlatter, Receipt, ReceiptText, Truck } from "lucide-react";
import { Pedido } from "../../utils/models/types/pedido";
import { DialogDetailOrder } from "../../../components/Order/dialogDetail";
import { useGetStatusQuery } from "@/redux/services/statusApi";
import { useSearchParams } from "next/navigation";



const orderTakeaway = (order: Pedido) => {
  return (
    <>
      <HandPlatter size={40} />
      <div className="grow px-4 flex items-center">
        <p className="my-auto hidden md:block w-20">{order.modo_entrega_descripcion}</p>
        <div className="grow">
          <p className="text-sm md:text-base font-semibold">{order.payer_first_name}</p>
        </div>
        <p className="text-xs md:text-sm ">{order.estado_pedido_descripcion}</p>
      </div>
      {
        <BadgeDollarSign className={`p-2 rounded-full`} size={40} color={`${order.pago ? 'green' : 'red'}`} aria-label={`${order.pago ? 'Paga' : 'Impaga'}`}/>
      }
    </>
  )
}

const orderDelivery = (order: Pedido) => {
  return (
    <>
      <Truck size={40} />
      <div className="grow px-4 flex items-center">
        <p className="my-auto hidden md:block w-20">{order.modo_entrega_descripcion}</p>
        <div className="grow">
          <p className="text-sm md:text-base font-semibold">{order.payer_first_name}</p>
          <p className="text-xs md:text-sm max-w-24 md:max-w-48 overflow-hidden overflow-ellipsis whitespace-nowrap">{order.payer_address}</p>
        </div>
        <p className="text-xs md:text-sm">{order.estado_pedido_descripcion}</p>
      </div>
      {
        <BadgeDollarSign className={`p-2 rounded-full`} size={40} color={`${order.pago ? 'green' : 'red'}`} aria-label={`${order.pago ? 'Paga' : 'Impaga'}`}/>
      }
      <div className="hidden md:block">
      {
        order.pago ? <p>{order.mp_id}</p> : null
      }
      </div>
    </>
  )
}

export default function Orders() {

  
  const { data: pedidos, error, isLoading } = useGetPedidosQuery();
  const { data: status, error: errorStatus, isLoading: isLoadingStatus } = useGetStatusQuery();
  
  const params = useSearchParams();
  const filter = params.get('filter');
  
  const filteredOrders = pedidos?.filter(pedido => {
    return !filter || pedido.estado_pedido_descripcion.toLowerCase().includes(filter.toLowerCase());
  });

  if (isLoading || isLoadingStatus) return <p>Loading...</p>;
  if (error || errorStatus) return <p>Error</p>;

  return(
    <>
      <div className="flex">
        {status?.map((status) => (
          <Link key={status.id} href={`/dashboard/orders?filter=${status.descripcion}`}>
            <Badge key={status.id} variant="outline" className={`mr-2 ${status.descripcion == filter ? 'bg-green-200' : 'bg-slate-100'}`}>
              {status.descripcion}
            </Badge>
          </Link>
        ))}
        <Link href="/dashboard/orders">
          <Badge variant="outline" className={`mr-2 ${!filter ? 'bg-green-200' : 'bg-slate-100'}`}>
            Todos
          </Badge>
        </Link>
      </div> 
      <div>
        
        {filteredOrders?.length === 0 && <p>No hay pedidos</p>}
        <ul>
          {filteredOrders?.map((order) => (
            <li key={order.id} className="flex w-full justify-between items-center p-4 bg-slate-200/20 my-2 rounded-full shadow shadow-slate-400/20 hover:bg-slate-100">    
              {
                (order.modo_entrega_id == 1) ? orderDelivery(order) : orderTakeaway(order)
              }
              <DialogDetailOrder {...order} />
            </li>
          ))}
        </ul>
        
      </div>
    </>
  )
};
