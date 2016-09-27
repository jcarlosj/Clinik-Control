// Clase principal (estructura de datos)
export class TipoImpuesto {

    // Constructor
    constructor(
        public id                  : string = '',
        public codigo              : string = '',
        public codigo_alternativo  : string = '',
        public descripcion         : string = '',
        public porcentaje          : number = 0,
        public base                : number = 0,
        public tipo_impuesto       : string = 'RF',
        public estado              : string = 'A',
        public registros           : number = 0        
    ) { }
}
