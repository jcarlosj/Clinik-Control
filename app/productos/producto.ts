export class Producto {
    //--- IDENTIFICACION DE PRODUCTO --- 
    public id                  : string;
    public codigo              : string;
    public agrupacion          : number; 
    public descripcion         : string;
    public descripcion1        : string;
    public marca               : number;  
    public codigoBarras        : string;
    public referencia          : string;
    public equivalencia        : string;
    public unidadMedida        : number;
    public unidadEmpaque       : number;
    public ubicacionBodega     : string;
    //--- PRECIOS Y DATOS ESTADISTICOS ---
    public precioVenta1        : number;
    public precioVenta2        : number;
    public precioVenta3        : number;
    public precioVenta4        : number;
    public precioVenta5        : number;
    public existencia          : number;
    public saldoPedido         : number;
    public costoPromedio       : number;   
    public costoUltimaCompra   : number;
    public costoFOB            : number; 
    //--- PARAMETROS (Legales) ---
    public tipoIVAVenta        : number;
    public tipoIVACompra       : number;
    public registroInvima      : string;
    public numeroMesesGarantia : number;
    //--- PARAMETROS (Controles sobre valores y cantidades) ---
    public stockMinimo         : number;
    public stockMaximo         : number;
    public porcMaxDtoContado   : number;
    public porcMaxDtoCredito   : number;
    public porcComisionVenta   : number;
    //--- PARAMETROS (Si/No) ---
    public productoActivo      : string;
    public productoSeVende     : string;
    public precioFijo          : string;
    public usaControlLotes     : string;
    public aplicaParaPedido    : string;
    public usaSeriales         : string;
    public productoEnConsig    : string;
    public productoControlado  : string;
    public permiteNegativos    : string;
    //--- PARAMETROS (Varios) ---
    public colorAgenda         : number;
    public presentacion        : number;
    public viaAdministracion   : number;
    //public codigoBono          : number;
    //--- OTROS ---
    //public observaciones
    //public riesgosAsociados
    //--- CONTROL ---
    //public idUsuarioCrea       : number;
    //public idUsuarioModifica   : number;
    //public fechaCrea           : number;
    //public fechaModifica       : number;
    //public registros           : number;

    //Constructor
    constructor( ) {
        //--- IDENTIFICACION DE PRODUCTO --- 
        this .id                    = '';
        this .codigo                = '';
        this .agrupacion            = 0; 
        this .descripcion           = '';
        this .descripcion1          = '';
        this .marca                 = 0; 
        this .codigoBarras          = '';
        this .referencia            = '';
        this .equivalencia          = '';
        this .unidadMedida          = 0; 
        this .unidadEmpaque         = 0;
        this .ubicacionBodega       = '';
        //--- PRECIOS Y DATOS ESTADISTICOS ---
        this .precioVenta1        = 0;
        this .precioVenta2        = 0;
        this .precioVenta3        = 0;
        this .precioVenta4        = 0;
        this .precioVenta5        = 0;
        this .existencia          = 0;
        this .saldoPedido         = 0;
        this .costoPromedio       = 0;   
        this .costoUltimaCompra   = 0;
        this .costoFOB            = 0; 
        //--- PARAMETROS (Legales) ---
        this .tipoIVAVenta        = 0;
        this .tipoIVACompra       = 0;
        this .registroInvima      = '';
        this .numeroMesesGarantia = 0;
        //--- PARAMETROS (Controles sobre valores y cantidades) ---
        this .stockMinimo         = 0;
        this .stockMaximo         = 0;
        this .porcMaxDtoContado   = 0;
        this .porcMaxDtoCredito   = 0;
        this .porcComisionVenta   = 0;
        //--- PARAMETROS (Si/No) --- 
        this .productoActivo      = 'S';
        this .productoSeVende     = 'N';
        this .precioFijo          = 'S';
        this .usaControlLotes     = 'N';
        this .aplicaParaPedido    = 'N';
        this .usaSeriales         = 'N';
        this .productoEnConsig    = 'N';
        this .productoControlado  = 'N';
        this .permiteNegativos    = 'N';
        //--- OTROS ---
        this .colorAgenda         = 0;
        this .presentacion        = 0;
        this .viaAdministracion   = 0;

        //--- CONTROL ---
        //this .registros         = 0;
    }
    
}