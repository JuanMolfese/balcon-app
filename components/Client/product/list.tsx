"use client"
import Link from "next/link";
import { ProductoDetail } from "../../../app/utils/models/types/producto";
import Image from "next/image";
import Search from "./search";
import CardProduct from "./cardProduct";
import { useEffect, useState } from "react";
import Cart from "../../Cart";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { addProductInCart, removeProductInCart } from "../../../app/(clientes)/cart/cart";
import UserMenu from "../../Dashboard/Layout/userMenu";


interface ProductInCart extends ProductoDetail {
  cantidad: number;
}

export default function ListProducts({ products }: { products?: any[] }) {

  const [cart, setCart] = useState<ProductInCart[]>([]);

  useEffect(() => {
    actualizarCarrito();
  }, []);

  const actualizarCarrito = async () => {
    const res = await fetch('/api/client/cart');
    if (res.ok) {
      const { cart } = await res.json();
      setCart(cart);
    }
  }
  
  const agregarProducto =  async (producto: ProductInCart, cant: number) => {
    const res = await fetch('/api/client/cart', {
      method: 'POST',
      body: JSON.stringify({ producto, cant }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (res.ok) {
      const mytoast = toast({
        title: "Producto agregado",
        description: "El producto fue agregado al carrito.",
        /* action: <ToastAction altText="Ver carrito">Ver carrito</ToastAction>, */
      })
      setTimeout(() => {
        mytoast.dismiss();
      }, 3000);
      actualizarCarrito();
    } else {
      const mytoast = toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un error al agregar el producto al carrito.",
        action: <ToastAction altText="Reintentar">Reintentar</ToastAction>,
      })
      setTimeout(() => {
        mytoast.dismiss();
      }, 3000);
    }
  }

  const removeProductCart = (producto: ProductInCart) => {
   /*  const newCart = cart.filter(p => p.id !== producto.id);
    setCart(newCart);
    removeProductInCart(producto); */
    /* if (newCart.length === 0) {
      viewCart();
    } */
    fetch('/api/client/cart', {
      method: 'DELETE',
      body: JSON.stringify({ producto }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async res => {
      if (res.ok) {
        const mytoast = toast({
          title: "Producto eliminado",
          description: "El producto fue eliminado del carrito.",
          /* action: <ToastAction altText="Ver carrito">Ver carrito</ToastAction>, */
        })
        setTimeout(() => {
          mytoast.dismiss();
        }, 3000);
        actualizarCarrito();
      } else {
        const mytoast = toast({
          variant: "destructive",
          title: "Error",
          description: "Hubo un error al eliminar el producto del carrito.",
          action: <ToastAction altText="Reintentar">Reintentar</ToastAction>,
        })
        setTimeout(() => {
          mytoast.dismiss();
        }, 3000);
      }
    });
  }
  

  const viewCart = () => {
    /* if (cart.length > 0) {
      document.getElementById('listProd')?.classList.toggle('hidden');
      document.getElementById('cartProd')?.classList.toggle('hidden');
      document.getElementById('cart')?.classList.toggle('bg-gray-200');
    } else {
      const mytoast = toast({
        variant: "destructive",
        title: "Carrito vacío",
        description: "No hay productos en el carrito.",
        action: <ToastAction altText="Comprar">Comprar</ToastAction>,
      })
      setTimeout(() => {
        mytoast.dismiss();
      }, 3000);
    } */
    document.getElementById('listProd')?.classList.toggle('hidden');
    document.getElementById('cartProd')?.classList.toggle('hidden');
    document.getElementById('cart')?.classList.toggle('bg-gray-200');
  }

  return (
    <div className="h-screen">
      
      <nav className="flex gap-1 items-center bg-color-nav justify-around sticky top-0 ">
        <Link href={'/'} className="drop-shadow-md hover:drop-shadow-xl">
          <Image src="/balcon-icon.png" alt="logo" width={80} height={80} className="cursor-pointer"/>
        </Link>
        <Search placeholder="Buscar productos" />
        <UserMenu />
        <div id="cart" className="flex row-reverse cursor-pointer p-2 rounded-full lg:hidden" onClick={() => viewCart()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          
          <span className="ml-1" >{cart.length}</span>
          
        </div>

      </nav>
      <main id="listProd" className="flex">
        {/* <div className="w-1/3">
          <h5>Filtros</h5>
        </div> */}
        <ul className="flex flex-wrap py-2 gap-1">
          {products?.map(product => (
            <CardProduct product={product} key={product.id} agregar={agregarProducto} />
            
            ))}
        </ul>
        <div className="hidden lg:block min-w-96 p-4 border-l-2">
          <Cart cart={cart} removeProductCart={removeProductCart} viewCart={viewCart} />
        </div>
      </main>

      
      
      <div id="cartProd" className="hidden container p-4">
        <Cart cart={cart} removeProductCart={removeProductCart} viewCart={viewCart} />
      </div>
    </div>
  );
}