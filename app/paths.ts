export class Path {

    static Server = {
      // API       : 'http://localhost/clinik_api/src/',
      // LOCALHOST : 'http://localhost:3000/app/',  
      // TEMPLATE  : '../app',
      API       : 'app',
      LOCALHOST : '',  
      TEMPLATE  : '../app/',
    };
}

export class Validate {

    static RegExp = {
      ENTERO        : '^[0-9]+([0-9]+)?$',
      DECIMAL       : '^[0-9]+([,][0-9]+)?$',
      ALFANUMERICO  : '^[a-zA-Z0-9 ]+([a-zA-Z0-9 ]+)?$',
      ALFABETICO    : '^[a-zA-Z ]+([a-zA-Z ]+)?$',
      CODIGO_BARRAS : '^[a-zA-Z0-9 ]+([a-zA-Z0-9 ]+)?$',
      GENERAL       : '^[a-zA-Z0-9 ]+([a-zA-Z0-9!@#$%^&*()_ ]+)?$'
    }
}    

export class Data {
    static getfechaActual() : string {
      let fecha = new Date();
      // Obtenemos el año, mes y día actual.
      return fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
    }
}