// Clase principal (estructura de datos)
export class TipoImpuesto {

    // Constructor
    constructor(
        public id                : string = '',
        public codigo            : string = '',
        public codigoAlternativo : string = '',
        public descripcion       : string = '',
        public porcentaje        : number = 0,
        public base              : number = 0,
        public tipoImpuesto      : string = 'RF',
        public estado            : string = 'A',
        public idUsuarioCrea     : number = 0,
        public idUsuarioModifica : number = 0,
        public fechaCreacion     : string = '',
        public fechaModificacion : string = '',
        public registros         : number = 0        
    ) { }
}
