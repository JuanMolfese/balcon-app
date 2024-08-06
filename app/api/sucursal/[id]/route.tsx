import { NextResponse } from "next/server";
import { connectdb } from "../../../utils/models/db";

import io from 'socket.io-client';
import { Sucursal } from "../../../utils/models/types/sucursal";
const socket = io('http://localhost:3000');

export async function GET(req: Request, { params } : { params: {id: number}}) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const id = params.id;
    const [sucursal] = await connection.execute(`SELECT * FROM Sucursal WHERE id = ?`, [id]);
    
    return NextResponse.json(sucursal, {status: 200});

  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  } 
}

export async function PUT(req: Request, { params } : {params: {id: number}}) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const id = params.id;
    const status = await req.json();
    const res = await connection.execute(`UPDATE Sucursal SET status_sucursal_id = ? WHERE id = ?`, [status, id]);
    socket.emit('updateSucursal', 'Sucursal Actualizada');
    return NextResponse.json({status: 200});   
  } catch (error) {
    console.log(error);
    return NextResponse.json({status: 500});
  } finally {
    if (connection) {
      connection.release();
    }
  }
}