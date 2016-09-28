// Clase principal (estructura de datos)
export class FormaPago {

    // Constructor
    constructor(
        public id                  : number = 0,
        public codigo              : string = "", 
        public descripcion         : string = "", 
        public estado              : string = "A",
        public tipo                : number = 1,
        public registros           : number = 0
    ) { }
}