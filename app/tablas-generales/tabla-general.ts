// Principal Class
export class TablaGeneral {

    // Constructor
    constructor(
        private id                : string = '',
        private codigo            : string = '',
        private descripcion       : string = '',
        private estado            : string = 'A',
        //private tipo            : number = 1,
        private idUsuarioCrea     : number = 0,     // <-- Parámetros: Control.
        private idUsuarioModifica : number = 0,
        private fechaCreacion     : string = '',
        private fechaModificacion : string = '',
        private registro         : number = 0
    ) { }
}
