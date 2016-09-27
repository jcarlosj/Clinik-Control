// Clase principal (estructura de datos)
export class FormaPago {

    // Constructor
    constructor(
        public id                  : string = "",
        public codigo              : string = "", 
        public descripcion         : string = "", 
        public estado              : string = "A",
        public tipo                : number = 1,
<<<<<<< HEAD
        public registros           : number = 0
=======
        public id_usuario_crea     : number = 0,     // <-- Parámetros: Control.
        public id_usuario_modifica : number = 0,
        public fecha_creacion      : string = '',
        public fecha_modificacion  : string = '',
        public registro            : number = 0
>>>>>>> 0f8169bf2ebc5a717ccca094377bb6eab5ecbe70
    ) { }
}