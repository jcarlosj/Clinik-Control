import { InMemoryDbService } from 'angular2-in-memory-web-api';
//export class InMemoryDataService {
  export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
    ];
    let formas_pago = [
      {id: '01', codigo: '01', descripcion: 'efectivo', estado: 'A', tipo: 1, editable: true, borrable: false },
      {id: '02', codigo: '02', descripcion: 'Tarjeta de credito', estado: 'A', tipo: 1, editable: true, borrable: false },
      {id: '03', codigo: '03', descripcion: 'Transferencia electronica', estado: 'A', tipo: 1, editable: true, borrable: false },
      {id: '04', codigo: '04', descripcion: 'Pago multiple', estado: 'A', tipo: 2, editable: true, borrable: false },
      {id: '05', codigo: '05', descripcion: 'Prueba', estado: 'I', tipo: 1, editable: true, borrable: true }
    ];
    let tablas_generales = [
      {
        id          : '01',
        codigo      : '01',
        descripcion : 'Marca 1',
        estado      : 'A',
        tipo        : 'mrc',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 1,
        idUsuarioModifica : 1,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '2016-07-16'
      },
      {
        id          : '02',
        codigo      : '02',
        descripcion : 'Marca 2',
        estado      : 'A',
        tipo        : 'mrc',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 1,
        idUsuarioModifica : 2,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '1977-11-24'
      },
      {
        id          : '03',
        codigo      : '03',
        descripcion : 'Presentacion medicamentos 1',
        estado      : 'I',
        tipo        : 'premed',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 2,
        idUsuarioModifica : 3,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '1977-11-24'
      }
    ];
    let marca = [
      {
        id          : '01',
        codigo      : '01',
        descripcion : 'Marca 1',
        estado      : 'A',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 1,
        idUsuarioModifica : 1,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '2016-07-16'
      },
      {
        id          : '02',
        codigo      : '02',
        descripcion : 'Marca 2',
        estado      : 'A',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 1,
        idUsuarioModifica : 2,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '1977-11-24'
      },
      {
        id          : '03',
        codigo      : '03',
        descripcion : 'Marca 3',
        estado      : 'I',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 2,
        idUsuarioModifica : 3,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '1977-11-24'
      }
    ];
    let presentacion_medicamento = [
      {
        id          : '01',
        codigo      : '01',
        descripcion : 'Presentación medicamento 1',
        estado      : 'A',
        tipo        : 'premed',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 1,
        idUsuarioModifica : 1,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '2016-07-16'
      },
      {
        id          : '02',
        codigo      : '02',
        descripcion : 'Presentación medicamento 2',
        estado      : 'A',
        tipo        : 'premed',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 1,
        idUsuarioModifica : 2,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '1977-11-24'
      },
      {
        id          : '03',
        codigo      : '03',
        descripcion : 'Presentación medicamento 3',
        estado      : 'I',
        tipo        : 'premed',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 2,
        idUsuarioModifica : 3,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '1977-11-24'
      }
    ];
    let vias_administracion = [
      {
        id          : '01',
        codigo      : '01',
        descripcion : 'Vías de administración 1',
        estado      : 'A',
        tipo        : 'vadmon',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 1,
        idUsuarioModifica : 1,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '2016-07-16'
      },
      {
        id          : '02',
        codigo      : '02',
        descripcion : 'Vías de administración 2',
        estado      : 'A',
        tipo        : 'vadmon',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 1,
        idUsuarioModifica : 2,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '1977-11-24'
      },
      {
        id          : '03',
        codigo      : '03',
        descripcion : 'Vías de administración 3',
        estado      : 'I',
        tipo        : 'vadmon',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 2,
        idUsuarioModifica : 3,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '1977-11-24'
      }
    ];
    let riesgo_procedimiento = [
      {
        id          : '01',
        codigo      : '01',
        descripcion : 'Riesgos de procedimiento 1',
        estado      : 'A',
        tipo        : 'rproced',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 1,
        idUsuarioModifica : 1,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '2016-07-16'
      },
      {
        id          : '02',
        codigo      : '02',
        descripcion : 'Riesgos de procedimiento 2',
        estado      : 'A',
        tipo        : 'rproced',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 1,
        idUsuarioModifica : 2,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '1977-11-24'
      },
      {
        id          : '03',
        codigo      : '03',
        descripcion : 'Riesgos de procedimiento 3',
        estado      : 'I',
        tipo        : 'rproced',
        editable    : true,
        borrable    : true,
        idUsuarioCrea     : 2,
        idUsuarioModifica : 3,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '1977-11-24'
      }
    ];

    let tipos_impuesto = [
      {
        //id                : '01',
        codigo            : 'IV',
        codigoAlternativo : '01',
        descripcion       : 'Iva',
        porcentaje        : 12,
        base              : 1,
        tipoImpuesto      : 'IVA',
        estado            : 'A',
        editable          : true,
        borrable          : true,
        idUsuarioCrea     : 2,
        idUsuarioModifica : 3,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '1977-11-24'
      },
      {
        //id                : '02',
        codigo            : 'RF',
        codigoAlternativo : '02',
        descripcion       : 'Retención en la fuente',
        porcentaje        : 12,
        base              : 1,
        tipoImpuesto      : 'RF',
        estado            : 'A',
        editable          : true,
        borrable          : true,
        idUsuarioCrea     : 2,
        idUsuarioModifica : 3,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '1977-11-24'
      }
    ];
    let agrupacion = [
      {
        id                : 1,
        codigo            : "01",
        descripcion       : "Descripción Agrupación 1",
        codigoPadre       : 1,
        nivel             : 1,
        permiteDetalle    : "N",
        orden             : 1,
        editable          : true,
        borrable          : true,
        idUsuarioCrea     : 2,
        idUsuarioModifica : 3,
        fechaCreacion     : '1955-09-21',
        fechaModificacion : '1977-11-24'
      }
    ]
    return {heroes, formas_pago, tipos_impuesto, tablas_generales, marca, presentacion_medicamento, vias_administracion, riesgo_procedimiento, agrupacion};
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/