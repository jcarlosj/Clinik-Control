// Principal Class
export class Documento {

    // Constructor
    constructor(
        public id                  : number = 0,
        public codigo              : string = '',
        public descripcion         : string = '',
        public concepto            : number = 1,
        public registros           : number = 0
    ) { }
}
