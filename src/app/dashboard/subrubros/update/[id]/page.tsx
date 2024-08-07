"use client"
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useGetSubrubrosByIdQuery, useUpdateSubrubroMutation } from '@/redux/services/subrubrosApi';
import { useGetRubrosQuery } from '@/redux/services/rubrosApi';
import { myToastError, myToastSuccess } from '@/componentes/myToast';
import { Rubro } from '../../../../utils/models/types/rubro';

export default function UpdateSubrubroPage({ params }: { params: { id: string } }) {
  const router = useRouter(); 
  const id = params.id;
  const { data: subrubro, isLoading, error } = useGetSubrubrosByIdQuery(id);  
  const { data: rubros, error: errorRubros, isLoading: loadingRubros } = useGetRubrosQuery();

  const [updateSubrubro] = useUpdateSubrubroMutation();
  
  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedSubrubro = {
      id: formData.get('id_subrubro'),
      nombre: formData.get('name'),
      rubro_id: formData.get('rubro_id'),
    };
    
    try {
      const res = await updateSubrubro(updatedSubrubro).unwrap();
      myToastSuccess("Subrubro actualizado exitosamente");
      router.push("/dashboard/subrubros");
      router.refresh();
    } catch (error) {
      myToastError("Error al actualizar el subrubro");
    }
  };
  
  if (isLoading || loadingRubros) return <p>Cargando...</p>;
  if (error || errorRubros) return <p>Error al cargar datos</p>;
  
  return (
    <form className="bg-gray-50 lg:w-[500px] my-4 mx-2 rounded-md" onSubmit={handleUpdate}>
      <label htmlFor="id_subrubro" className="sr-only">SubRubro ID</label>
      <input type="number" id="id_subrubro" className="hidden" defaultValue={id} name="id_subrubro" />
      
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900 pointer-events-none">
          Editar Subrubro: {subrubro?.nombre}
        </h2>
      </div>
      <div className="rounded-md p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="rubro_id" className="mb-2 block text-sm font-medium">Elegir rubro</label>
          <div className="relative">
            <select
              id="rubro_id"
              name="rubro_id"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={subrubro?.rubro_id}
            >
              <option value="" disabled>Seleccionar nuevo rubro</option>
              {rubros?.map((rubro: Rubro) => (
                <option key={rubro.id} value={rubro.id}>{rubro.nombre}</option>
              ))}
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <path fillRule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd" />
            </svg>
          </div>          
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={subrubro?.nombre}
          />          
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/subrubros" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">Cancelar</Link>
        <button className="flex h-10 items-center rounded-lg bg-blue-400 px-4 text-sm text-white font-medium transition-colors hover:bg-blue-500" type="submit">Modificar</button>
      </div>
    </form>
  );
}