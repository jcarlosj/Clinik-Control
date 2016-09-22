// Clase principal (estructura de datos)
export class Producto {

    //Constructor
    constructor( 
        public id                  : string = '',    // <-- Identificación de producto.
        public codigo              : string = '',
        public agrupacion          : number = 0, 
        public descripcion1        : string = '',
        public descripcion2        : string = '',
        public marca               : number = 0, 
        public codigoBarras        : string = '',
        public referencia          : string = '',
        public equivalencia        : string = '',
        public unidadMedida        : number = 0,
        public unidadEmpaque       : number = 0,
        public ubicacionBodega     : string = '',
        public precioVenta1        : number = 0,     // <-- Precios y datos estadísticos.
        public precioVenta2        : number = 0,     
        public precioVenta3        : number = 0,     
        public precioVenta4        : number = 0,     
        public precioVenta5        : number = 0,     
        public existencia          : number = 0,
        public saldoPedido         : number = 0, 
        public costoPromedio       : number = 0,    
        public costoUltimaCompra   : number = 0,
        public costoFOB            : number = 0,
        public tipoIVAVenta        : number = 0,     // <-- Parámetros: Legales.
        public tipoIVACompra       : number = 0,
        public registroInvima      : string = '',
        public numeroMesesGarantia : number = 0,
        public stockMinimo         : number = 0,     // <-- Parámetros: Controles sobre valores y cantidades.
        public stockMaximo         : number = 0,
        public porcMaxDtoContado   : number = 0,
        public porcMaxDtoCredito   : number = 0,
        public porcComisionVenta   : number = 0,
        public productoActivo      : string = '',    // <-- Parámetros: Selección S/N.
        public productoSeVende     : string = '',
        public precioFijo          : string = '',
        public usaControlLotes     : string = '',
        public aplicaParaPedido    : string = '',
        public usaSeriales         : string = '',
        public productoEnConsig    : string = '',
        public productoControlado  : string = '',
        public permiteNegativos    : string = '',
        public colorAgenda         : number = 0,     // <-- Parámetros: Otros.
        public presentacion        : number = 0,
        public viaAdministracion   : number = 0,
        //public codigoBono        : number = 0,
        //public observaciones     : string = '',
        //public riesgosAsociados  : string = '',
        public estado              : string = 'A',
        public idUsuarioCrea       : number = 0,     // <-- Parámetros: Control.
        public idUsuarioModifica   : number = 0,
        public fechaCrea           : string = '',
        public fechaModifica       : string = '',
        public registros           : number = 0

    ) { }
    
}