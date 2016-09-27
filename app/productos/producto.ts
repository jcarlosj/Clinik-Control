// Clase principal (estructura de datos)
export class Producto {

    //Constructor
    constructor( 
        public id                    : string = '',    // <-- Identificación de producto.
        public codigo                : string = '',
        public agrupacion            : number = 1, 
        public descripcion1          : string = '',
        public descripcion2          : string = '',
        public marca                 : number = 1, 
        public codigo_barras         : string = '',
        public referencia            : string = '',
        public equivalencia          : string = '',
        public unidad_medida         : number = 1,
        public unidad_empaque        : number = 0,
        public ubicacion_bodega      : string = '',
        public precio_venta1         :  number = 0,     // <-- Precios y datos estadísticos.
        public precio_venta2         : number = 0,     
        public precio_venta3         : number = 0,     
        public precio_venta4         : number = 0,     
        public precio_venta5         : number = 0,     
        public existencia            : number = 0,
        public saldo_pedido          : number = 0, 
        public costo_promedio        : number = 0,    
        public costo_ultima_compra   : number = 0,
        public costo_fob             : number = 0,
        public tipo_iva_venta        : number = 1,     // <-- Parámetros: Legales.
        public tipo_iva_compra       : number = 1,
        public registro_invima       : string = '',
        public numero_meses_garantia : number = 0,
        public stock_minimo          : number = 0,     // <-- Parámetros: Controles sobre valores y cantidades.
        public stock_maximo          : number = 0,
        public porc_max_dto_contado  : number = 0,
        public porc_max_dto_credito  : number = 0,
        public porc_comision_venta   : number = 0,
        public producto_activo       : string = 'S',    // <-- Parámetros: Selección S/N.
        public producto_se_vende     : string = 'N',
        public precio_fijo           : string = 'S',
        public usa_control_lotes     : string = 'N',
        public aplica_para_pedido    : string = 'N',
        public usa_seriales          : string = 'N',
        public producto_en_consig    : string = 'N',
        public producto_controlado   : string = 'N',
        public permite_negativos     : string = 'N',
        public color_agenda          : string = '',     // <-- Parámetros: Otros.
        public presentacion          : number = 1,
        public via_administracion    : number = 1,
        //public codigoBono        : number = 0,
        //public observaciones     : string = '',
        //public riesgosAsociados  : string = '',
        public estado                : string = 'A',
        public registros             : number = 0

    ) { }
    
}