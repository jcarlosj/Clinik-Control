// Principal Class
export class TablaGeneral {
    // Atributes
    public id          : string;
    public codigo      : string;
    public descripcion : string;
    public estado      : string;
    //public tipo        : number;
    public editable    : boolean;
    public borrable    : boolean;
    public idUsuarioCrea     : number;
    public idUsuarioModifica : number;
    public fechaCreacion     : string;
    public fechaModificacion : string;

    // Constructor
    constructor() {
        // Inicialice atributes
        this.id          = "";
        this.codigo      = "";
        this.descripcion = "";
        this.estado      = "A";
        //this.tipo        = 1;
        this.editable    = false;
        this.borrable    = false;
        this .idUsuarioCrea     = 0;
        this .idUsuarioModifica = 0;
        this .fechaCreacion     = "";
        this .fechaModificacion = "";
    }
}
