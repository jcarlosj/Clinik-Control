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
      HEXADECIMAL   : '^[#]+([a-fA-F0-9]+)?$',  
      ALFANUMERICO  : '^[a-zA-Z0-9 ]+([a-zA-Z0-9 ]+)?$',
      ALFABETICO    : '^[a-zA-Z ]+([a-zA-Z ]+)?$',
      CODIGO_BARRAS : '^[a-zA-Z0-9]+([a-zA-Z0-9]+)?$',
      CODIGO        : '^[a-zA-Z0-9]+([a-zA-Z0-9]+)?$',
      GENERAL       : '^[a-zA-Z0-9 ]+([a-zA-Z0-9!@#$%^&*()_ ]+)?$',
      EMAIL         : '^[a-zA-Z0-9]+([_.-]?[a-zA-Z0-9]+)@[a-zA-Z0-9]+([_.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,4})+$',
      FECHA         : '^([0-9]{2}\/[0-9]{2}\/[0-9]{4})$'
    }
}    

export class Data {
    static getfechaActual() : string {
      let fecha = new Date();
      // Obtenemos el año, mes y día actual.
      return fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
    }
}

export class Simulate {
    static getConsecutivo() : number {

      let number = Math .floor( Math .random() * 999999999 );
      return number;
    }
}