"use client";

import Link from "next/link";
import createRubro from "../../app/utils/actions/rubros/create";
import { useRouter } from "next/navigation";

export default function FormRubro() {   

  const router = useRouter();

  const handelCreateRubro = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFormData = new FormData(event.currentTarget);
    const res = await createRubro(newFormData);
    if (res.success) {
      router.push("/dashboard/rubros");
      router.refresh();
    } else {
      alert("Error al crear el rubro");
    }
  }

  return (
    <form className="bg-gray-50 my-4 mx-2 rounded-md" onSubmit={handelCreateRubro}>
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Crear Rubro
        </h2>
      </div>
      <div className="rounded-md p-4 md:p-6">

        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Nombre"
            aria-describedby="name-error"
          />
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/rubros"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <button
          className="flex h-10 items-center rounded-lg bg-blue-400 px-4 text-sm text-white font-medium transition-colors hover:bg-blue-500"
          type="submit"
        >
          Crear
        </button>
      </div>
    </form>
  );
}
