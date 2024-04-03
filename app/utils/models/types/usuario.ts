export type Usuario = {
    id: number;
    email: string;
    pass: string;
    nombre: string;
    apellido: string;
    rol_id: number;    
};

export type UsuarioDetail = {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    rol_id: number;
    descripcion: string;
};
  