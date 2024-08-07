"use client"

import { useEffect } from "react";
import ListProducts from "@/componentes/Client/product/list";

import { io } from "socket.io-client";
import { useGetSucursalQuery } from "@/redux/services/sucursalApi";
import { useRouter } from "next/navigation";
import Spinner from "@/componentes/spinner";
const socket = io(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000');

export default function ProductsSale() {

  const { data: sucursal, error, isLoading, refetch } = useGetSucursalQuery(1);
  const router = useRouter();
  
  (sucursal?.status_sucursal_id == 2) && router.push("/") 

  useEffect(() => {
    socket.on('updateSuc', () => {
      window.location.reload();
    });
  }, []);

  if (isLoading) return <Spinner />
  
  if (error) return <Spinner />
  

  
 
  return (
    <>
      <ListProducts />
    </>
  )
}