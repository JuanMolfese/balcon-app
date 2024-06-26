import { NextResponse } from "next/server";
import { connection } from "../../utils/models/db";
import { Subrubro } from "../../utils/models/types/subrubro";

export async function GET() {
  
  try {
    const result = await connection.query<Subrubro[]>("SELECT * FROM Subrubro");    
    const rubros = result.map((subrubro) => {
      return {
        id: subrubro.id,
        nombre: subrubro.nombre,
        rubro_id: subrubro.rubro_id
      };
    })
    return NextResponse.json(rubros);
  } catch (error) {
    console.log(error);
  }finally{
    await connection.end(); // Cierra la conexión a la base de datos
  }
  
}