// Clase principal (estructura de datos)
export class Producto {

    //Constructor
    constructor( 
        private id                  : string = '',    // <-- Identificación de producto.
        private codigo              : string = '',
        private agrupacion          : number = 0, 
        private descripcion1        : string = '',
        private descripcion2        : string = '',
        private marca               : number = 0, 
        private codigoBarras        : string = '',
        private referencia          : string = '',
        private equivalencia        : string = '',
        private unidadMedida        : number = 0,
        private unidadEmpaque       : number = 0,
        private ubicacionBodega     : string = '',
        private precioVenta1        : number = 0,     // <-- Precios y datos estadísticos.
        private precioVenta2        : number = 0,     
        private precioVenta3        : number = 0,     
        private precioVenta4        : number = 0,     
        private precioVenta5        : number = 0,     
        private existencia          : number = 0,
        private saldoPedido         : number = 0, 
        private costoPromedio       : number = 0,    
        private costoUltimaCompra   : number = 0,
        private costoFOB            : number = 0,
        private tipoIVAVenta        : number = 0,     // <-- Parámetros: Legales.
        private tipoIVACompra       : number = 0,
        private registroInvima      : string = '',
        private numeroMesesGarantia : number = 0,
        private stockMinimo         : number = 0,     // <-- Parámetros: Controles sobre valores y cantidades.
        private stockMaximo         : number = 0,
        private porcMaxDtoContado   : number = 0,
        private porcMaxDtoCredito   : number = 0,
        private porcComisionVenta   : number = 0,
        private productoActivo      : string = '',    // <-- Parámetros: Selección S/N.
        private productoSeVende     : string = '',
        private precioFijo          : string = '',
        private usaControlLotes     : string = '',
        private aplicaParaPedido    : string = '',
        private usaSeriales         : string = '',
        private productoEnConsig    : string = '',
        private productoControlado  : string = '',
        private permiteNegativos    : string = '',
        private colorAgenda         : number = 0,     // <-- Parámetros: Otros.
        private presentacion        : number = 0,
        private viaAdministracion   : number = 0,
        //private codigoBono        : number = 0,
        //private observaciones     : string = '',
        //private riesgosAsociados  : string = '',
        private idUsuarioCrea       : number = 0,     // <-- Parámetros: Control.
        private idUsuarioModifica   : number = 0,
        private fechaCrea           : string = '',
        private fechaModifica       : string = '',
        private registro            : number = 0

    ) { }
    
}