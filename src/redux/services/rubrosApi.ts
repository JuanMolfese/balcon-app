import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Rubro } from '../../app/utils/models/types/rubro'

export const rubrosApi = createApi({
  reducerPath: 'rubrosApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/' 
  }),
  endpoints: (builder) => ({
    getRubros: builder.query<Rubro[], void>({
      query: () => 'rubros',
    }),
    getRubroById: builder.query<Rubro, string>({
      query: (id) => `rubros/${id}`,
    }),
    updateRubro: builder.mutation({
      query: ({name, id}) => ({
        url: `rubros/${id}`,
        method: 'PUT',
        body: {name},
      }),
    }),
    deleteRubro: builder.mutation({
      query: (id) => ({
        url: `rubros/${id}`,
        method: 'DELETE',
      }),
    }),
    createRubro: builder.mutation({
      query: (name) => ({
        url: `rubros`,
        method: 'POST',
        body: name,
      }),
    }),
  }),
})

export const { useGetRubrosQuery, useGetRubroByIdQuery, useUpdateRubroMutation, useDeleteRubroMutation, useCreateRubroMutation } = rubrosApi