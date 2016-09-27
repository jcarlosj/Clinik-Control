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
        public id_usuario_crea      : number = 0,     // <-- Parámetros: Control. 
        public id_usuario_modifica  : number = 0, 
        public fecha_creacion       : string = '',
        public fecha_modificacion   : string = '',
        public registro             : number = 0,
        public estado               : string = 'A' 
    ) { }
}