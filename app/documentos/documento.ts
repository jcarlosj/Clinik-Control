// Principal Class
export class Documento {

    // Constructor
    constructor(
        public id                  : number = 0,
        public codigo              : string = '',
        public descripcion         : string = '',
        public estado              : string = 'A',
        public registros           : number = 0
    ) { }
}
