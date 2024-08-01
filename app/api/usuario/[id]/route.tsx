import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { connection } from "../../../utils/models/db";
import { Usuario } from "../../../utils/models/types/usuario";
import { hash } from "bcrypt";

export async function GET(req: Request, { params } : {params: {id: number}}) {
  try {
    const id = params.id;
    const res = await connection.query<Usuario[]>(`SELECT * FROM Usuario WHERE id = ${id}`);
    await connection.end();
    return NextResponse.json({data: res[0], status: 200});
  } catch (error) {
    return NextResponse.json({ error: error },{ status: 500 });
  } finally {
    await connection.end();
  }
}

export async function PUT(request: Request, {params}: {params: {id: number}}) {
  try {
    let mensaje = "";
    const id = params.id;
    const { password, id_rol } = await request.json();  
    if (password) {
      const passHash = await hash(password, 10);
      await connection.query<Usuario>(`UPDATE Usuario SET pass = '${passHash}' WHERE id = ${id}`);
      mensaje = "Contraseña actualizada correctamente";
    }
    if (id_rol) {
      await connection.query<Usuario>(`UPDATE Usuario SET rol_id = ${id_rol} WHERE id = ${id}`);
      mensaje = "Rol actualizado correctamente";
    }
    await connection.end();
    return NextResponse.json({ message: mensaje, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error },{ status: 500 });
  } finally {
    await connection.end();
  }
}

export async function DELETE(req: Request) {
  const { user } = await req.json();
  try {
    await connection.query<Usuario>(`DELETE FROM Usuario WHERE id = ${user.id}`);
    await connection.end();
    return NextResponse.json({ message: "Usuario eliminado correctamente", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "El usuario no pudo ser eliminado" },{ status: 500 });
  } finally {
    await connection.end();
  }
 
  /* try {
    const res = await fetch(`http://localhost:3000/api/usuario/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });
    console.log(res);
    return NextResponse.json({ message: "Usuario eliminado correctamente", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error },{ status: 500 });
  } */
}