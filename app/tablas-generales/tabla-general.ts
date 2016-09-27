// Principal Class
export class TablaGeneral {

    // Constructor
    constructor(
        public id                  : string = '',
        public codigo              : string = '',
        public descripcion         : string = '',
        public estado              : string = 'A',
        //public tipo            : number = 1,
        public id_usuario_crea     : number = 0,     // <-- Parámetros: Control.
        public id_usuario_modifica : number = 0,
        public fecha_creacion      : string = '',
        public fecha_modificacion  : string = '',
        public registro            : number = 0
    ) { }
}
