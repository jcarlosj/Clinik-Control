// Clase principal (estructura de datos)
export class Tercero {

    //Constructor
    constructor( 
        public id                    : string = '',    // <-- Datos Básicos.
        public codigo                  : string = '',
        public tipo_doc_identificacion : number = 1, 
        public numero_identificacion   : string = '',
        public ciudad_expedicion       : number = 1,
        public dv                      : string = '', 
        public razon_social            : string = '',
        public nombre1                 : string = '',
        public nombre2                 : string = '',
        public apellido1               : string = '',
        public apellido2               : string = '',
        public direccion               : string = '',     // <-- Datos Ubicación.
        public id_ciudad               : number = 1,     
        public id_barrio               : number = 1,     
        public telefono_fijo           : string = '',     
        public telefono_movil          : string = '',     
        public e_mail                  : string = '',
        public id_zona                 : number = 1, 
        public fecha_nacimiento        : string = '',     // <-- Datos Personales.
        public lugar_nacimiento        : number = 0,
        public grupo_sanguineo         : number = 1,
        public sexo                    : number = 1,
        public estado_civil            : number = 1,     
        public profesion_oficio        : number = 1,
        public id_eps                  : number = 1,
        public tiene_convenio          : string = 'N',     // <-- Datos ClinikControl.
        public tipo_afiliacion         : string = 'N',
        public id_profesional_asignado : number = 4,      
        public exento_iva              : string = 'N',    // <-- Parámetros: Legales.
        public autoretenedor           : string = 'N',      
        public tipo_persona            : string = '1',
        public cupo_credito            : number = 0,      // <-- Parámetros: Controles CxC Cxp y caja.
        public dias_plazo              : number = 1,
        public lista_precios           : number = 1,
        public porc_dto_contado        : number = 0,
        public porc_dto_credito        : number = 0,
        public afiliado_fidelizacion   : string = 'N',     // <-- Parámetros: Varios.
        public tipo_impresion_fv       : string = '1',
        //public referencias_terceros    : definir,        // <-- Manejar pestañas.
        //public observaciones           : definir,
        //public tipo_tercero            : definir,
        public estado                  : string = 'A',      // <-- Parámetros: Control.
        public registros               : number = 0
    ) { }
    
}