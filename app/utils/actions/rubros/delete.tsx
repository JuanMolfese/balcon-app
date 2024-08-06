"use server"

import { connectdb } from "../../models/db";

export default async function deleteRubro(id : number) {
  let connection;
  try{
    connection = await connectdb.getConnection();
    
    const verify_noSubrubros:any = await connection.execute('SELECT * FROM Subrubro WHERE rubro_id=?', [id]);
    
    if(!verify_noSubrubros || verify_noSubrubros.length === 0){
      const result:any = await connection.execute('DELETE FROM Rubro WHERE id = (?)', [id]) 
      
      if (result.affectedRows === 0) {
        return { error: `No se pudo eliminar el rubro ${id}` };
      }else{
        return {
          success: true,
          status: 200,
          message: "El rubro fue eliminado",
        };    
      }  
   }
  }
  catch (error) {
    console.error("Error al eliminar el rubro:", error);
    return {
      success: false,
      status: 500,
      message: "Error interno del servidor",
    };
  }finally {
     if (connection) {
      await connection.release();
    }
  }
}