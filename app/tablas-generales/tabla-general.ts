// Principal Class
export class TablaGeneral {

    // Constructor
    constructor(
        public id                : string = '',
        public codigo            : string = '',
        public descripcion       : string = '',
        public estado            : string = 'A',
        //public tipo            : number = 1,
        public idUsuarioCrea     : number = 0,     // <-- Parámetros: Control.
        public idUsuarioModifica : number = 0,
        public fechaCreacion     : string = '',
        public fechaModificacion : string = '',
        public registro         : number = 0
    ) { }
}
