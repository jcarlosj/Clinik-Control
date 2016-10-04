// Principal Class
export class Documento {

    // Constructor
    constructor(
        public id                  : number = 0,
        public codigo              : string = '',
        public descripcion         : string = '',
        public concepto            : number = 1,
        public fecha               : string = '',
        public tercero             : number = 0,
        public direccion           : string = '',
        public bodegaOrigen        : number = 1,
        public bodegaDestino       : number = 1,
        public producto            : number = 0
    ) { }
}
