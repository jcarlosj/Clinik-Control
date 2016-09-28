// Principal Class
export class TablaGeneral {

    // Constructor
    constructor(
        public id                  : number = 0,
        public codigo              : string = '',
        public descripcion         : string = '',
        public estado              : string = 'A',
        public registros           : number = 0
    ) { }
}
