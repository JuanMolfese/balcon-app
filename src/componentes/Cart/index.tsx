import { removeFromCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { ProductCart } from "../../app/utils/models/types/producto";

export default function Cart({viewCart} : {viewCart: () => void}) {
  const carrito = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const handleDelete = (product: ProductCart) => {
    dispatch(removeFromCart(product));
  }
  
  return(
    <main className="max-w-screen max-h-screen">
      <h1 className="text-center text-xl font-bold my-4">Carrito de compras</h1>
      <div className="overflow-auto w-full">
        <table className="divide-y divide-gray-200 w-full">
          <tbody className="bg-white-200 divide-y divide-gray-200">
            {carrito.items.map(product => (
              <tr key={product.id} className="mt-2 flex">
                <td className="pl-4 py-1 w-[40%] overflow-hidden text-ellipsis whitespace-nowrap flex flex-col">
                  <span className="text-xs">{product.subrubro_nombre}</span>
                  {product.nombre}
                </td>
                <td className="px-2 py-1 w-[15%] whitespace-nowrap flex items-center justify-center">{product.cantidad}</td>
                <td className="pr-l pr-4 py-1 w-[35%] whitespace-nowrap flex items-center justify-end">
                  {(product.precio).toLocaleString('es-ar', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}
                </td>
                <td className="pr-4 py-1 w-[10%] whitespace-nowrap flex justify-center items-center">
                  <button className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600" onClick={() => handleDelete(product)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* <div className="hidden lg:block">
        {carrito.items.length > 0 && (
          <button className="px-4 py-2 mt-2 rounded-lg bg-slate-800 text-white border w-full font-bold drop-shadow-md">
            <Link href="/productos/locationPreference">
              Confirma Compra
            </Link>
          </button>
        )}
        </div> */}
      </div>
      {/* Muestra Total del Carrito */}
      <div className="flex justify-end mr-10 mt-4">
        <span className="text-xl font-bold">Total: {(carrito.total).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits: 2})}</span>
      </div>
    
      <div className="fixed bottom-4 left-0 w-full bg-white md:m-auto md:relative md:bottom-0 ">
        <div className="flex justify-around py-2 px-4 gap-2">
          <button
            className="px-4 py-2 rounded-lg bg-slate-800 text-white border font-bold drop-shadow-md md:hidden lg:hidden"
            onClick={viewCart}
          >
            Seguir Comprando
          </button>
          {carrito.items.length > 0 && (
            <button className="px-4 py-2 rounded-lg bg-slate-800 text-white border font-bold drop-shadow-md md:mt-10">
              <Link href="/productos/locationPreference">
                Confirmar Compra
              </Link>
            </button>
          )}
        </div>
      </div>
    </main>
  )
}