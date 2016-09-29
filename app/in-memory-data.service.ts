import { InMemoryDbService } from 'angular2-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    let formas_pago = [
      {id: '01', codigo: '01', descripcion: 'efectivo',                  estado: 'A', tipo: 1, registros: 1 },
      {id: '02', codigo: '02', descripcion: 'Tarjeta de credito',        estado: 'A', tipo: 1, registros: 1 },
      {id: '03', codigo: '03', descripcion: 'Transferencia electronica', estado: 'A', tipo: 1, registros: 1 },
      {id: '04', codigo: '04', descripcion: 'Pago multiple',             estado: 'A', tipo: 2, registros: 1 },
      {id: '05', codigo: '05', descripcion: 'Prueba',                    estado: 'I', tipo: 1, registros: 1 }
    ];

    let tipos_formas_pago = [
        { id: 1, descripcion: 'Efectivo/convencional' },
        { id: 2, descripcion: 'Tipo multiple' },
        { id: 3, descripcion: 'Tarjetas Datafono' },
        { id: 4, descripcion: 'Cheques' },
        { id: 5, descripcion: 'Tarjetas imprinter' },
        { id: 6, descripcion: 'Vales' },
        { id: 7, descripcion: 'Bonos' },
        { id: 8, descripcion: 'Transferencia electronica' },
        { id: 9, descripcion: 'Consignación directa' },
        { id: 10, descripcion: 'Tarjeta prepago' }
    ]; 

    let productos = [
      {
        //--- IDENTIFICACION DE PRODUCTO --- 
        id: '01', codigo: '01', agrupacion: 1, descripcion1: 'Producto (1)', descripcion2: 'Descripcion del producto (1)', marca: 1, codigo_barras: 'DEREDERRA-234', referencia: 'AT-098i', equivalencia: 'Equivalencia', unidad_medida: 1, unidad_empaque: 6, ubicacion_bodega: 'Por ahi anda', 
        //--- PRECIOS Y DATOS ESTADISTICOS ---
        precio_venta1: 82000, precio_venta2: 90000, precio_venta3: 120000, precio_venta4: 150000, precio_venta5: 180000, existencia: 12, saldo_pedido: 36, costo_promedio: 23000, costo_ultima_compra: 21500, costo_fob: 27, 
        //--- PARAMETROS (Legales) ---
        tipo_iva_venta: 1, tipo_iva_compra: 1, registro_invima: 'RegistroInvima', numero_meses_garantia : 6,
        //--- PARAMETROS (Controles sobre valores y cantidades) ---
        stock_minimo: 12, stock_maximo: 30, porc_max_dto_contado: 5, porc_max_dto_credito: 7, porc_comision_venta: 5, 
        //--- PARAMETROS (Si/No) ---
        producto_activo: 'S', producto_se_vende: 'N', precio_fijo: 'S', usa_control_lotes: 'N', aplica_para_pedido: 'N', usa_seriales: 'N', producto_en_consig: 'N', producto_controlado: 'N', permite_negativos: 'N', 
        //--- PARAMETROS (Varios) ---
        color_agenda: '#CC00CC', presentacion: 1, via_administracion: 1, 
        //codigoBono          : 0,
        //--- OTROS ---
        // observaciones    : '', riesgosAsociados : '',
        //--- CONTROL ---
        estado: 'A', registros: 0
      }
    ];

    let terceros = [
      {
        //--- DATOS BÁSICOS --- 
        id: '01', codigo: '01', tipo_doc_identificacion: 1, numero_identificacion: '79854214', ciudad_expedicion: 3, dv: '1', razon_social: 'Fulano de Tal por cual', nombre1: 'Fulano', nombre2: 'de Tal', apellido1: 'para', apellido2: 'cual', 
        //--- DATOS DE UBICACIÓN ---
        direccion: 'Av Carrera con Calle', id_ciudad: 3, id_barrio: 2, telefono_fijo: '2342111', telefono_movil: '3002154487', e_mail: 'fulanitodetalporcual@correo.co', id_zona: 3, 
        //--- DATOS PERSONALES ---
        fecha_nacimiento: '1983-02-15', lugar_nacimiento: 3, grupo_sanguineo: 'A+', sexo: 'm', estado_civil: 2, profesion_oficio: 3, id_eps: 3,  
        //--- DATOS CLINIK CONTROL ---
        tiene_convenio: 'N', tipo_afiliacion: 'N', id_profesional_asignado: 1,
        //--- PARAMETROS LEGALES ---
        exento_iva: 'N', autoretenedor: 'N', tipo_persona: 1, 
        //--- PARAMETROS CONTROL CXC CXP Y CAJA ---
        cupo_credito: 1, dias_plazo: 15, lista_precios: 1, porc_dto_contado: 10, porc_dto_credito: 12,  
        //--- PARAMETROS VARIOS ---
        afiliado_fidelizacion: 'N', tipo_impresion_fv: 1, 
        //--- MANEJAR PESTAÑAS ---
        // referenciasTerceros: '', observaciones: '', tipoTercero: '',
        //--- CONTROL ---
        estado: 'A', registros: 0
      },
            {
        //--- DATOS BÁSICOS --- 
        id: '01', codigo: '01', tipo_doc_identificacion: 1, numero_identificacion: '79854214', ciudad_expedicion: 3, dv: '1', razon_social: 'Perencejo de Tal por cual', nombre1: 'Perencejo', nombre2: 'de Tal', apellido1: 'para', apellido2: 'cual', 
        //--- DATOS DE UBICACIÓN ---
        direccion: 'Av Carrera con Calle', id_ciudad: 3, id_barrio: 2, telefono_fijo: '2342111', telefono_movil: '3002154487', e_mail: 'fulanitodetalporcual@correo.co', id_zona: 3, 
        //--- DATOS PERSONALES ---
        fecha_nacimiento: '1983-02-15', lugar_nacimiento: 3, grupo_sanguineo: 'A+', sexo: 'm', estado_civil: 2, profesion_oficio: 3, id_eps: 3,  
        //--- DATOS CLINIK CONTROL ---
        tiene_convenio: 'N', tipo_afiliacion: 'N', id_profesional_asignado: 1,
        //--- PARAMETROS LEGALES ---
        exento_iva: 'N', autoretenedor: 'N', tipo_persona: 1, 
        //--- PARAMETROS CONTROL CXC CXP Y CAJA ---
        cupo_credito: 1, dias_plazo: 15, lista_precios: 1, porc_dto_contado: 10, porc_dto_credito: 12,  
        //--- PARAMETROS VARIOS ---
        afiliado_fidelizacion: 'N', tipo_impresion_fv: 1, 
        //--- MANEJAR PESTAÑAS ---
        // referenciasTerceros: '', observaciones: '', tipoTercero: '',
        //--- CONTROL ---
        estado: 'A', registros: 0
      }
    ];
    /* TABLAS GENERALES */
    let marca = [
      { id: '01', codigo: '01', descripcion: 'Marca 1', estado: 'A', registros: 1 },
      { id: '02', codigo: '02', descripcion: 'Marca 2', estado: 'A', registros: 1 },
      { id: '03', codigo: '03', descripcion: 'Marca 3', estado: 'A', registros: 1 },
      { id: '04', codigo: '04', descripcion: 'Marca 4', estado: 'A', registros: 1 }
    ];
    let presentacion_medicamento = [
      { id: '01', codigo: '01', descripcion: 'Presentación medicamento 1', estado: 'A', registros: 1 },
      { id: '02', codigo: '02', descripcion: 'Presentación medicamento 2', estado: 'A', registros: 1 },
      { id: '03', codigo: '03', descripcion: 'Presentación medicamento 3', estado: 'A', registros: 1 }
    ];
    let vias_administracion = [
      { id: '01', codigo: '01', descripcion: 'Vías de administración 1', estado: 'A', registros: 1 },
      { id: '02', codigo: '02', descripcion: 'Vías de administración 2', estado: 'A', registros: 1 },
      { id: '03', codigo: '03', descripcion: 'Vías de administración 3', estado: 'A', registros: 1 }
    ];
    let riesgo_procedimiento = [
      { id: '01', codigo: '01', descripcion: 'Riesgos de procedimiento 1', estado: 'A', registros: 1 },
      { id: '02', codigo: '02', descripcion: 'Riesgos de procedimiento 2', estado: 'A', registros: 1 },
      { id: '03', codigo: '03', descripcion: 'Riesgos de procedimiento 3', estado: 'A', registros: 1 }
    ];
    let unidades_medida = [
      { id: '01', codigo: '01', descripcion: 'Unidades de medida 1', estado: 'A', registros: 1 },
      { id: '02', codigo: '02', descripcion: 'Unidades de medida 2', estado: 'A', registros: 1 }
    ]; 
    /* DOCUMENTOS */
    let entradas = [
      { id: '01', codigo: '01', concepto: 2, /*tercero: 1,*/ descripcion: 'Entrada 1', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 1, bodegaDestino: 3 },
      { id: '02', codigo: '02', concepto: 1, /*tercero: 2,*/ descripcion: 'Entrada 2', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 2, bodegaDestino: 3 },
      { id: '03', codigo: '03', concepto: 2, /*tercero: 1,*/ descripcion: 'Entrada 3', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 2, bodegaDestino: 4 },
      { id: '04', codigo: '04', concepto: 3, /*tercero: 1,*/ descripcion: 'Entrada 4', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 3, bodegaDestino: 1 }
    ];   
    let salidas = [
      { id: '01', codigo: '01', concepto: 3, /*tercero: 2,*/ descripcion: 'Salida 1', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 2, bodegaDestino: 4 },
      { id: '02', codigo: '02', concepto: 2, /*tercero: 3,*/ descripcion: 'Salida 2', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 3, bodegaDestino: 2 },
      { id: '03', codigo: '03', concepto: 1, /*tercero: 4,*/ descripcion: 'Salida 3', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 4, bodegaDestino: 3 },
      { id: '04', codigo: '04', concepto: 2, /*tercero: 4,*/ descripcion: 'Salida 4', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 1, bodegaDestino: 2 }
    ];     
    let compras = [
      { id: '01', codigo: '01', concepto: 1, /*tercero: 2,*/ descripcion: 'Compra 1', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 1, bodegaDestino: 1 },
      { id: '02', codigo: '02', concepto: 1, /*tercero: 3,*/ descripcion: 'Compra 2', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 1, bodegaDestino: 2 },
      { id: '03', codigo: '03', concepto: 1, /*tercero: 3,*/ descripcion: 'Compra 3', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 2, bodegaDestino: 2 },
      { id: '04', codigo: '04', concepto: 2, /*tercero: 1,*/ descripcion: 'Compra 4', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 3, bodegaDestino: 3 }
    ];         
    let ventas = [
      { id: '01', codigo: '01', concepto: 1, /*tercero: 2,*/ descripcion: 'Venta 1', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 2, bodegaDestino: 2 },
      { id: '02', codigo: '02', concepto: 2, /*tercero: 2,*/ descripcion: 'Venta 2', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 1, bodegaDestino: 3 },
      { id: '03', codigo: '03', concepto: 3, /*tercero: 1,*/ descripcion: 'Venta 3', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 1, bodegaDestino: 4 },
      { id: '04', codigo: '04', concepto: 3, /*tercero: 1,*/ descripcion: 'Venta 4', fecha: '2016-09-29', direccion: 'Av Calle con carrera', bodegaOrigen: 1, bodegaDestino: 4 }
    ];     

    let tipos_impuesto = [
      { id: '01', codigo: '01', codigo_alternativo: '001', descripcion: 'Iva', porcentaje: 12, base: 1, tipo_impuesto: 'IVA', estado: 'A', registros: 0 },
      { id: '02', codigo: '02', codigo_alternativo: '002', descripcion: 'Iva', porcentaje: 12, base: 1, tipo_impuesto: 'IVA', estado: 'A', registros: 0 },
      { id: '03', codigo: '03', codigo_alternativo: '003', descripcion: 'Iva', porcentaje: 12, base: 1, tipo_impuesto: 'IVA', estado: 'A', registros: 0 },
      { id: '04', codigo: '04', codigo_alternativo: '004', descripcion: 'Iva', porcentaje: 12, base: 1, tipo_impuesto: 'IVA', estado: 'A', registros: 0 },
    ];
    let agrupaciones = [
      { id: '01', codigo: '01', descripcion: 'Descripción Agrupación 1', codigo_padre: 1, nivel: 1, permite_detalle: 'N', orden: 1, registros: 1, estado: 'A' },
      { id: '02', codigo: '02', descripcion: 'Descripción Agrupación 2', codigo_padre: 1, nivel: 1, permite_detalle: 'N', orden: 1, registros: 1, estado: 'A' },
      { id: '03', codigo: '03', descripcion: 'Descripción Agrupación 3', codigo_padre: 1, nivel: 1, permite_detalle: 'N', orden: 1, registros: 1, estado: 'A' }

    ];

    let data = [
      {
        agrupaciones:[
              {id: 1, nombre: 'Agrupación a'},
              {id: 2, nombre: 'Agrupación b'},
              {id: 3, nombre: 'Agrupación c'}
        ],
        marcas:[
              {id: 1, nombre: 'Marca a'},
              {id: 2, nombre: 'Marca b'},
              {id: 3, nombre: 'Marca c'}
        ],
        presentaciones:[
              {id: 1, nombre: 'Presentación a'},
              {id: 2, nombre: 'Presentación b'},
              {id: 3, nombre: 'Presentación c'}
        ],
        tiposDeIva:[
              {id: 1, nombre: '%5'},
              {id: 2, nombre: '%7'},
              {id: 3, nombre: '%12'},
              {id: 4, nombre: '%16'}
        ],
        unidades:[
              {id: 1, nombre: 'Unidad de medida 1'},
              {id: 2, nombre: 'Unidad de medida 2'}
        ],
        vias:[
              {id: 1, nombre: 'Vía de administración a'},
              {id: 2, nombre: 'Vía de administración b'},
              {id: 3, nombre: 'Vía de administración c'}
        ],
        /*--- TERCEROS ---*/
        ciudades:[
              {id: 1, nombre: 'Bogotá D.C.'},
              {id: 2, nombre: 'Medellín'},
              {id: 3, nombre: 'Santiago de Cali'}
        ],
        barrios:[
              {id: 1, nombre: 'El Nogal'},
              {id: 2, nombre: 'Los Rosales'},
              {id: 3, nombre: 'Cedritos'},
              {id: 3, nombre: 'Chico'}
        ],
        zonas:[
              {id: 1, nombre: 'Zona norte'},
              {id: 2, nombre: 'Zona sur'},
              {id: 3, nombre: 'Zona centro'},
              {id: 4, nombre: 'Zona oriente'},
              {id: 5, nombre: 'Zona occidente'}
        ],
        tipoDocumento:[
              {id: 1, nombre: 'Tarjeta de identidad'},
              {id: 2, nombre: 'Cédula de ciudadania'},
              {id: 3, nombre: 'NIT'},
              {id: 4, nombre: 'Cédula de extrangería'}
        ],
        sexo:[
              {id: 1, genero: 'Masculino'},
              {id: 2, genero: 'Femenino'}
        ],
        grupoSanguineo:[
              {id: 1, tipo: 'A-'},
              {id: 2, tipo: 'A+'},
              {id: 3, tipo: 'B-'},
              {id: 4, tipo: 'B+'},
              {id: 5, tipo: 'AB-'},
              {id: 6, tipo: 'AB+'},      
              {id: 7, tipo: 'O-'},
              {id: 8, tipo: 'O+'}
        ],
        estadoCivil:[
              {id: 1, estado: 'Soltero/a'},
              {id: 2, estado: 'Casado/a'},
              {id: 3, estado: 'Separado/a'},
              {id: 4, estado: 'Viudo/a'},
              {id: 5, estado: 'Unión libre'}
        ],
        profesionOficio:[
              {id: 1, tipo: 'Profesión u oficio 1' },
              {id: 2, tipo: 'Profesión u oficio 2' },
              {id: 3, tipo: 'Profesión u oficio 3' }
        ],
        eps:[
              {id: 1, nombre: 'CafeSalud'},
              {id: 2, nombre: 'Sura'},
              {id: 3, nombre: 'Compensar'},
              {id: 4, nombre: 'SOS'}
        ],
        profesionalAsignado:[
              {id: 1, nombre: 'Fulano de tal'},
              {id: 2, nombre: 'Sultado de tal'},
              {id: 3, nombre: 'Perencejo de tal'},
              {id: 4, nombre: 'Fulano de tal por cual'}
        ],
        tipoPersona:[
              {id: 1, tipo: 'Persona Natural'},
              {id: 2, tipo: 'Persona Jurídica'},
        ],
        tipoImpresion:[
              {id: 1, tipo: 'No imprime'},
              {id: 2, tipo: 'Tiquete'},
              {id: 3, tipo: 'Corporativa'}
        ],
        //--- Documentos
        conceptos: [
              {id: 1, nombre: 'Concepto 1'},
              {id: 2, nombre: 'Concepto 2'},
              {id: 3, nombre: 'Concepto 3'}
        ],
        terceros: [
              {id: 1, nombre: 'Tercero (Un fulano de tal) 1'},
              {id: 2, nombre: 'Tercero (Un fulano de tal) 2'},
              {id: 3, nombre: 'Tercero (Un fulano de tal) 3'}
        ],
        bodegas: [
              {id: 1, nombre: 'La 1'},
              {id: 2, nombre: 'La 2'},
              {id: 3, nombre: 'La 3'}
        ],
        origenes: [
              {id: 1, nombre: 'Origenes 1'},
              {id: 2, nombre: 'Origenes 2'},
              {id: 3, nombre: 'Origenes 3'},
              {id: 4, nombre: 'Origenes 4'}
        ],
        destinos: [
              {id: 1, nombre: 'Destinos 1'},
              {id: 2, nombre: 'Destinos 2'},
              {id: 3, nombre: 'Destinos 3'},
              {id: 4, nombre: 'Destinos 4'}
        ],
      }
    ];




    return { 
      data,
      formas_pago,
      tipos_formas_pago, 
      productos, 
      tipos_impuesto,  
      agrupaciones,
      terceros,
      // Tablas Generales
      marca, 
      presentacion_medicamento, 
      vias_administracion, 
      riesgo_procedimiento,
      unidades_medida,
      // Documentos
      entradas,
      salidas,
      compras,
      ventas
    };
  }
}