// Imports personalizados necesarios para este componente
import { Simulate }      from '../paths';

// Principal Class
export class Documento {

    // Constructor
    constructor(
        public id                  : number = 0,
        public codigo              : string = Simulate.getConsecutivo().toString(),
        public descripcion         : string = '',
        public concepto            : number = 1,
        public fecha               : string = Simulate.getDate(),
        public tercero             : number = -1,
        public direccion           : string = '',
        public bodegaOrigen        : number = 1,
        public bodegaDestino       : number = 1,
        public producto            : number = 0,
        public desc_tmp            : string = ''
    ) { }
}
