// TODO: hacer tipos DB, Ej: Tarea, TareaDB
export type Tarea = {
  Id: number;
  Nombre: string;
  Descripcion?: string;
  Tags: Tag[];
  Users: User[];
  FechaCreacion: string;
  FechaModificada: string;
  FechaLimite: string;
};

export type LineaTiempo = {
  Id: number;
  Nombre: string;
  Descripcion: string;
  Fecha_publicacion: string;
};

export type Subtarea = {
  Id: number;
  Nombre: string;
  Descripcion: string;
  FechaTerminacion?: string | null; 
  Estado?: boolean;
  Sistema?: number;
};

export type Tablero = {
  Id: number;
  Nombre: string;
  FechaInicio: string;
  FechaFin: string;
  Users: User[];
}

export type Tag = {
  Nombre: string;
  Id?: number;
};

export type User = {
  Nombre: string;
  Iniciales?: string;
  Id?: number;
};

export type Section = {
  Id: number;
  Nombre: string;
  Tareas: Tarea[];
};


export type Departamento = {
  id: number;
}

export type Sistema = {
  sistemaId: number,
  sistemaNombre: string,
  sistemaDescripcion: string,
  avancePartes: string[],
  avanceTareas: {
    tareaId: number,
    tareaNombre: string,
    tareaDesc: string,
    tareaFecha: string,
    tareaStatus: boolean
  }[];
}

export type Info = {
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  participantes: User[]|undefined;
  inSubtarea: boolean;
}


