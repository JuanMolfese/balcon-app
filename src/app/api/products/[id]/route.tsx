import { NextResponse } from "next/server";
import { connectdb } from "../../../utils/models/db";
import { Producto } from "../../../utils/models/types/producto";
import { promises as fs } from 'fs';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


import io from 'socket.io-client';
import path from "path";
const socket = io(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000');

export async function GET(req: Request, { params } : {params: {id: number}}) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const id = params.id;
    const res = await connection.execute(`SELECT * FROM Producto WHERE id = ?`, [id]);
    return NextResponse.json({data: res[0], status: 200});   
  } catch (error) {
    return NextResponse.json({data: error, status: 500});
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
    const sucId = 1;
    const data = await req.formData();
    const nombre = data.get("name");
    const subrubro_id = data.get("subrubroId");
    const descripcion = data.get("descripcion");
    const stock = data.get("stock");
    const stock_minimo = data.get("stock_minimo");
    const precio = data.get("precio");
    const image = data.get("productImage");
    
    let imageUrl = null;
    if (image != null && image && typeof image === 'object' && 'name' in image && 'size' in image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const tempDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(tempDir, { recursive: true });
      const filePath = path.join(tempDir, image.name);
      await fs.writeFile(filePath, buffer);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'productos',
      });

      if (result) {
        imageUrl = result.secure_url;
      }

      await fs.unlink(filePath);
    }
    const resSucprod = await connection.execute(`UPDATE Sucursal_Productos SET precio = ?, stock = ?, stock_minimo = ? where producto_id = ? AND sucursal_id = ?`, [precio, stock, stock_minimo, id, sucId]);
    if (imageUrl)
      await connection.execute(`UPDATE Producto SET nombre = ?, descripcion = ?, subrubro_id = ?, image = ? WHERE id = ?`, [nombre, descripcion, subrubro_id, imageUrl, id]);
    else await connection.execute(`UPDATE Producto SET nombre = ?, descripcion = ?, subrubro_id = ? WHERE id = ?`, [nombre, descripcion, subrubro_id, id]);
    socket.emit('updateProducto', 'Producto Actualizado');
    return NextResponse.json({status: 200});   
  } catch (error) {
    return NextResponse.json({status: 500});
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function DELETE(req: Request, { params } : {params: {id: number}}) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const id = params.id;
    const res = await connection.execute(`DELETE FROM Producto WHERE id = ?`, [id]);
    socket.emit('updateProducto', 'Producto Eliminado');    
    return NextResponse.json({status: 200});   
  } catch (error) {
    return NextResponse.json({status: 500});
  } finally {
    if (connection) {
      connection.release();
    }
  }
}