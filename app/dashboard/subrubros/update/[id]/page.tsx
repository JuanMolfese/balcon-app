import React, { useState, useEffect } from 'react';
import { fetchRubros, fetchRubro } from '../../../../utils/actions/rubros/fetchs';
import { fetchInfoSubRubro } from '../../../../utils/actions/subrubros/fetchs';
import FormUpdateSubrubro from '../../../../../components/Subrubro/update-form';
import {Subrubro} from '../../../../utils/models/types/subrubro';
import {Rubro} from '../../../../utils/models/types/rubro';

export default function UpdateSubrubroPage({params,}:{
  params: {id: number};
}) {
   
  const id = params.id;

  const getRubros = async () => {
    try {
      const rubros = await fetchRubros(); // Espera a que se resuelva la promesa
      return rubros || []; // Retorna los rubros o un array vacío si no hay datos
    } catch (error) {
      console.error('Error fetching rubros:', error);
      return []; // Retorna un array vacío en caso de error
    }
  };
  
  const getRubroInfo = async (id:number) : Promise<Rubro | null>  => {
    try{
      const rubro = await fetchRubro(id); // devuelve el nombre del rubro del subrubro            
      return rubro; // Retorna el rubro o vacio
    }catch (error) {
      console.error('Error en el fetch de los datos del subrubro',error);
      return null;
    }
  };

  const getSubRubroInfo = async (): Promise<Subrubro | null> => {
    try{
      const subrubro = await fetchInfoSubRubro(id); // devuelve el     
      return subrubro || null; // Retorna el rubro o vacio
    }catch (error) {
      console.error('Error en el fetch de los datos del subrubro',error);
      return null;
    }
  };


  // Función para obtener los rubros y renderizar el componente
  const renderFormUpdateSubrubro = async () => {
    const infoSubRubro:Subrubro | null = await getSubRubroInfo();
    const rubros:Rubro[] = await getRubros();   
    let infoRubro: Rubro | null = null;     
    if (infoSubRubro) {
      const rubroId = infoSubRubro?.rubro_id ?? 0; // Valor predeterminado en caso de que infoSubRubro sea null o undefined
      infoRubro = await getRubroInfo(rubroId);
    }
    if (infoSubRubro && infoRubro) {
      return <FormUpdateSubrubro id={id} rubros={rubros} infoRubro={infoRubro} infoSubRubro={infoSubRubro}/>;
    }
  };

  return (
    <div className="flex justify-center">      
      {renderFormUpdateSubrubro()}
    </div>
  );
}