// Principal Class
export class Agrupacion {
    // Atributes
    public id                : number;
    public codigo            : string;
    public descripcion       : string;
    public codigoPadre       : string;
    public nivel             : number;
    public permiteDetalle    : string;
    public orden             : number;
    public editable          : boolean;
    public borrable          : boolean;
    public idUsuarioCrea     : number;
    public idUsuarioModifica : number;
    public fechaCreacion     : string;
    public fechaModificacion : string;

    // Constructor
    constructor() {
        // Inicialice atributes
        this .id                = 1;
        this .codigo            = "";
        this .descripcion       = "";
        this .codigoPadre       = "";
        this .nivel             = 1;
        this .permiteDetalle    = "";
        this .orden             = 1;
        this .editable           = false;
        this .borrable           = false;
        this .idUsuarioCrea     = 0;
        this .idUsuarioModifica = 0;
        this .fechaCreacion     = "";
        this .fechaModificacion = "";
    }
}
