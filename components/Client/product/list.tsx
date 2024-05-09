"use client"
import Link from "next/link";
import Image from "next/image";
import Search from "./search";
import CardProduct from "./cardProduct";
import Cart from "../../Cart";
import UserMenu from "../../Dashboard/Layout/userMenu";
import { useAppSelector } from "@/redux/hooks";


export default function ListProducts({ products, user }: { products?: any[], user: any }) {

  const carrito = useAppSelector(state => state.cart);

  const viewCart = () => {
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
        <UserMenu user={user}/>
        <div id="cart" className="flex row-reverse cursor-pointer p-2 rounded-full lg:hidden" onClick={() => viewCart()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          
          <span className="ml-1" >{carrito?.items.length}</span>
          
        </div>

      </nav>
      <main id="listProd" className="flex">
        <ul className="flex flex-wrap py-2 gap-1">
          {products?.map(product => (
            <CardProduct product={product} key={product.id} />
            ))}
        </ul>
        <div className="hidden lg:block min-w-96 p-4 border-l-2">
          <Cart />
        </div>
      </main>

      
      
      <div id="cartProd" className="hidden container p-4">
        <Cart/>
      </div>

    </div>
  );
}