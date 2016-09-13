// Principal Class
export class TipoImpuesto {
    // Atributes
    //id                : string;
    codigo            : string;
    codigoAlternativo : string;
    descripcion       : string;
    porcentaje        : number;
    base              : number;
    tipoImpuesto      : string;
    estado            : string;
    editable          : boolean;
    borrable          : boolean;
    idUsuarioCrea     : number;
    idUsuarioModifica : number;
    fechaCreacion     : string;
    fechaModificacion : string;

    // Constructor
    constructor() {
        // Inicialice atributes
        //this .id                = "0";
        this .codigo            = null;
        this .codigoAlternativo = null;
        this .descripcion       = null;
        this .porcentaje        = null;
        this .base              = null;
        this .tipoImpuesto      = null;
        this .estado            = null;
        this .editable          = null;
        this .borrable          = null;
        this .idUsuarioCrea     = null;
        this .idUsuarioModifica = null;
        this .fechaCreacion     = null;
        this .fechaModificacion = null;
    }
}
