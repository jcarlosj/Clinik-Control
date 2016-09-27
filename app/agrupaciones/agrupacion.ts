// Clase principal (estructura de datos)
export class Agrupacion {

    // Constructor
    constructor(
        public id                   : string = '',
        public codigo               : string = '',
        public descripcion          : string = '', 
        public codigo_padre         : number = 0,
        public nivel                : number = 0,
        public permite_detalle      : string = 'N',
        public orden                : number = 0,
<<<<<<< HEAD
        public registros            : number = 0,
=======
        public id_usuario_crea      : number = 0,     // <-- Parámetros: Control. 
        public id_usuario_modifica  : number = 0, 
        public fecha_creacion       : string = '',
        public fecha_modificacion   : string = '',
        public registro             : number = 0,
>>>>>>> 0f8169bf2ebc5a717ccca094377bb6eab5ecbe70
        public estado               : string = 'A' 
    ) { }
}