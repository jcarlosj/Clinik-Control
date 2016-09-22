import { InMemoryDbService } from 'angular2-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    let formas_pago = [
      {id: '01', codigo: '01', descripcion: 'efectivo',                  estado: 'A', tipo: 1, idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '2016-08-16', fechaModificacion: '2016-08-16', registro: 1 },
      {id: '02', codigo: '02', descripcion: 'Tarjeta de credito',        estado: 'A', tipo: 1, idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '2016-08-16', fechaModificacion: '2016-08-16', registro: 1 },
      {id: '03', codigo: '03', descripcion: 'Transferencia electronica', estado: 'A', tipo: 1, idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '2016-08-16', fechaModificacion: '2016-08-16', registro: 1 },
      {id: '04', codigo: '04', descripcion: 'Pago multiple',             estado: 'A', tipo: 2, idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '2016-08-16', fechaModificacion: '2016-08-16', registro: 1 },
      {id: '05', codigo: '05', descripcion: 'Prueba',                    estado: 'I', tipo: 1, idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '2016-08-16', fechaModificacion: '2016-08-16', registro: 1 }
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
        id                  : '01', 
        codigo              : '01', 
        agrupacion          : 1,
        descripcion1        : 'Producto (1)',
        descripcion2        : 'Descripcion del producto (1)',
        marca               : 1,
        codigoBarras        : 'DEREDERRA-234',
        referencia          : 'AT-098i',
        equivalencia        : 'Equivalencia',
        unidadMedida        : 1,
        unidadEmpaque       : 6,
        ubicacionBodega     : 'Por ahi anda',
        //--- PRECIOS Y DATOS ESTADISTICOS ---
        precioVenta1        : 82000,
        precioVenta2        : 90000,
        precioVenta3        : 120000,
        precioVenta4        : 150000,
        precioVenta5        : 180000,
        existencia          : 12,
        saldoPedido         : 36,
        costoPromedio       : 23000,   
        costoUltimaCompra   : 21500,
        costoFOB            : 27,
        //--- PARAMETROS (Legales) ---
        tipoIVAVenta        : 1,
        tipoIVACompra       : 1,
        registroInvima      : 'RegistroInvima',
        numeroMesesGarantia : 6,
        //--- PARAMETROS (Controles sobre valores y cantidades) ---
        stockMinimo         : 12,
        stockMaximo         : 30,
        porcMaxDtoContado   : 5,
        porcMaxDtoCredito   : 7,
        porcComisionVenta   : 5,
        //--- PARAMETROS (Si/No) ---
        productoActivo      : 'S',
        productoSeVende     : 'N',
        precioFijo          : 'S',
        usaControlLotes     : 'N',
        aplicaParaPedido    : 'N',
        usaSeriales         : 'N',
        productoEnConsig    : 'N',
        productoControlado  : 'N',
        permiteNegativos    : 'N',
        //--- PARAMETROS (Varios) ---
        colorAgenda         : '#CC00CC',
        presentacion        : 1,
        viaAdministracion   : 1,
        //codigoBono          : 0,
        //--- OTROS ---
        //public observaciones    : '';
        //public riesgosAsociados : '';
        //--- CONTROL ---
        estado              : 'A',
        idUsuarioCrea       : 0,
        idUsuarioModifica   : 0,
        fechaCrea           : '2016-01-01',
        fechaModifica       : '2016-09-16',
        registros           : 0
      }
    ];

    let marca = [
      { id: '01', codigo: '01', descripcion: 'Marca 1', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '1955-09-21', fechaModificacion: '2016-07-16', registro: 1 },
      { id: '02', codigo: '02', descripcion: 'Marca 2', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '1955-09-21', fechaModificacion: '2016-07-16', registro: 1 },
      { id: '03', codigo: '03', descripcion: 'Marca 3', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '1955-09-21', fechaModificacion: '2016-07-16', registro: 1 },
      { id: '04', codigo: '04', descripcion: 'Marca 4', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '1955-09-21', fechaModificacion: '2016-07-16', registro: 1 }
    ];
    let presentacion_medicamento = [
      { id: '01', codigo: '01', descripcion: 'Presentación medicamento 1', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '1955-09-21', fechaModificacion: '2016-07-16', registro: 1 },
      { id: '02', codigo: '02', descripcion: 'Presentación medicamento 2', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '1955-09-21', fechaModificacion: '2016-07-16', registro: 1 },
      { id: '03', codigo: '03', descripcion: 'Presentación medicamento 3', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '1955-09-21', fechaModificacion: '2016-07-16', registro: 1 }
    ];
    let vias_administracion = [
      { id: '01', codigo: '01', descripcion: 'Vías de administración 1', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica : 1, fechaCreacion: '1955-09-21', fechaModificacion : '2016-07-16', registro: 1 },
      { id: '02', codigo: '02', descripcion: 'Vías de administración 2', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica : 1, fechaCreacion: '1955-09-21', fechaModificacion : '2016-07-16', registro: 1 },
      { id: '03', codigo: '03', descripcion: 'Vías de administración 3', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica : 1, fechaCreacion: '1955-09-21', fechaModificacion : '2016-07-16', registro: 1 }
    ];
    let riesgo_procedimiento = [
      { id: '01', codigo: '01', descripcion: 'Riesgos de procedimiento 1', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '1955-09-21', fechaModificacion: '2016-07-16', registro: 1 },
      { id: '02', codigo: '02', descripcion: 'Riesgos de procedimiento 2', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '1955-09-21', fechaModificacion: '2016-07-16', registro: 1 },
      { id: '03', codigo: '03', descripcion: 'Riesgos de procedimiento 3', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '1955-09-21', fechaModificacion: '2016-07-16', registro: 1 }
    ];
    let unidades_medida = [
      { id: '01', codigo: '01', descripcion: 'Unidades de medida 1', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '1955-09-21', fechaModificacion: '2016-07-16', registro: 1 },
      { id: '02', codigo: '02', descripcion: 'Unidades de medida 2', estado: 'A', idUsuarioCrea: 1, idUsuarioModifica: 1, fechaCreacion: '1955-09-21', fechaModificacion: '2016-07-16', registro: 1 }
    ];

    let tipos_impuesto = [
      { id: '01', codigo: '01', codigoAlternativo: '001', descripcion: 'Iva', porcentaje: 12, base: 1, tipoImpuesto: 'IVA', estado: 'A', idUsuarioCrea: 2, idUsuarioModifica: 3, fechaCreacion: '1955-09-21', fechaModificacion : '1977-11-24', registros: 0 },
      { id: '02', codigo: '02', codigoAlternativo: '002', descripcion: 'Iva', porcentaje: 12, base: 1, tipoImpuesto: 'IVA', estado: 'A', idUsuarioCrea: 2, idUsuarioModifica: 3, fechaCreacion: '1955-09-21', fechaModificacion : '1977-11-24', registros: 0 },
      { id: '03', codigo: '03', codigoAlternativo: '003', descripcion: 'Iva', porcentaje: 12, base: 1, tipoImpuesto: 'IVA', estado: 'A', idUsuarioCrea: 2, idUsuarioModifica: 3, fechaCreacion: '1955-09-21', fechaModificacion : '1977-11-24', registros: 0 },
      { id: '04', codigo: '04', codigoAlternativo: '004', descripcion: 'Iva', porcentaje: 12, base: 1, tipoImpuesto: 'IVA', estado: 'A', idUsuarioCrea: 2, idUsuarioModifica: 3, fechaCreacion: '1955-09-21', fechaModificacion : '1977-11-24', registros: 0 },
    ];
    let agrupaciones = [
      { id: '01', codigo: '01', descripcion: 'Descripción Agrupación 1', codigoPadre: 1, nivel: 1, permiteDetalle: 'N', orden: 1, idUsuarioCrea: 1, idUsuarioModifica: 3, fechaCreacion: '1955-09-21', fechaModificacion: '1977-11-24', registro: 1, estado: 'A' },
      { id: '02', codigo: '02', descripcion: 'Descripción Agrupación 2', codigoPadre: 1, nivel: 1, permiteDetalle: 'N', orden: 1, idUsuarioCrea: 1, idUsuarioModifica: 3, fechaCreacion: '1955-09-21', fechaModificacion: '1977-11-24', registro: 1, estado: 'A' },
      { id: '03', codigo: '03', descripcion: 'Descripción Agrupación 3', codigoPadre: 1, nivel: 1, permiteDetalle: 'N', orden: 1, idUsuarioCrea: 1, idUsuarioModifica: 3, fechaCreacion: '1955-09-21', fechaModificacion: '1977-11-24', registro: 1, estado: 'A' }
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
      }
    ];

    return { 
      data,
      formas_pago, 
      marca, 
      presentacion_medicamento, 
      vias_administracion, 
      riesgo_procedimiento,
      unidades_medida,
      tipos_formas_pago, 
      productos, 
      tipos_impuesto,  
      agrupaciones
    };
  }
}