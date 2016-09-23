// Clase principal (estructura de datos)
export class Tercero {

    //Constructor
    constructor( 
        public id                    : string = '',    // <-- Datos Básicos.
        public codigo                : string = '',
        public tipoDocIdentificacion : number = 1, 
        public numeroIdentificacion  : string = '',
        public ciudadExpedicion      : number = 1,
        public dv                    : string = '', 
        public razonSocial           : string = '',
        public nombre1               : string = '',
        public nombre2               : string = '',
        public apellido1             : string = '',
        public apellido2             : string = '',
        public direccion             : string = '',     // <-- Datos Ubicación.
        public idCiudad              : number = 1,     
        public idBarrio              : number = 1,     
        public telefonoFijo          : string = '',     
        public telefonoMovil         : string = '',     
        public eMail                 : string = '',
        public idZona                : number = 1, 
        public fechaNacimiento       : string = '',     // <-- Datos Personales.
        public lugarNacimiento       : number = 0,
        public grupoSanguineo        : number = 1,
        public sexo                  : number = 1,
        public estadoCivil           : number = 1,     
        public profesionOficio       : number = 1,
        public idEPS                 : number = 1,
        public tieneConvenio         : string = 'N',     // <-- Datos ClinikControl.
        public tipoAfiliacion        : string = 'N',
        public idProfesionalAsignado : number = 4,      
        public exentoIVA             : string = 'N',    // <-- Parámetros: Legales.
        public autoretenedor         : string = 'N',      
        public tipoPersona           : string = '1',
        public cupoCredito           : number = 0,      // <-- Parámetros: Controles CxC Cxp y caja.
        public diasPlazo             : number = 1,
        public listaPrecios          : number = 1,
        public porcDtoContado        : number = 0,
        public porcDtoCredito        : number = 0,
        public afiliadoFidelizacion  : string = 'N',     // <-- Parámetros: Varios.
        public tipoImpresionFV       : string = '1',
        //public referenciasTerceros   : definir,        // <-- Manejar pestañas.
        //public observaciones     : definir,
        //public tipoTercero       : definir,
        public estado              : string = 'A',      // <-- Parámetros: Control.
        public idUsuarioCrea       : number = 0,         
        public idUsuarioModifica   : number = 0,
        public fechaCrea           : string = '',
        public fechaModifica       : string = '',
        public registros           : number = 0
    ) { }
    
}