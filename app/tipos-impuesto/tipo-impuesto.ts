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
<<<<<<< HEAD
=======
        public id_usuario_crea     : number = 0,
        public id_usuario_modifica : number = 0,
        public fecha_creacion      : string = '',
        public fecha_modificacion  : string = '',
>>>>>>> 0f8169bf2ebc5a717ccca094377bb6eab5ecbe70
        public registros           : number = 0        
    ) { }
}
