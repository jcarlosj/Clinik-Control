// Clase principal (estructura de datos)
export class Agrupacion {

    // Constructor
    constructor(
        public id                   : string = '',
        public codigo               : string = '',
        public descripcion          : string = '', 
        public codigoPadre          : number = 0,
        public nivel                : number = 0,
        public permiteDetalle       : string = 'N',
        public orden                : number = 0,
        public idUsuarioCrea        : number = 0,     // <-- Parámetros: Control. 
        public idUsuarioModifica    : number = 0, 
        public fechaCreacion        : string = '',
        public fechaModificacion    : string = '',
        public registro             : number = 0,
        public estado               : string = 'A' 
            ) { }
}