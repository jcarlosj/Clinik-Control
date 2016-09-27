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
        public registros            : number = 0,
        public estado               : string = 'A' 
    ) { }
}