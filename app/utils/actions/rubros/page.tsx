import { unstable_noStore } from "next/cache";
import { connection } from "../../models/db";
import { Rubro } from "../../models/types/rubro";

export async function fetchRubros() {
  unstable_noStore();
  try {
    const result = await connection.query<Rubro[]>("SELECT * FROM Rubro");
    await connection.end();
    return result;
  } catch (error) {
    console.log(error);
  }
}