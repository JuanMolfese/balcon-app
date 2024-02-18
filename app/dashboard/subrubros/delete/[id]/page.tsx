import FormUpdateSubrubro from '../../../../../components/Subrubro/delete-form';

export default function DeleteSubrubroPage({params,}:{
  params: {id: number};
}) {
   
  const id = params.id;

  // Función para obtener los rubros y renderizar el componente
  const renderFormDeleteSubrubro = async () => {
    return <FormUpdateSubrubro id={id}/>;
  };

  return (
    <>      
      {renderFormDeleteSubrubro()}
    </>
  );
}