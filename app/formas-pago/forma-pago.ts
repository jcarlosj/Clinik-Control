export class FormaPago {
    id: string;
    codigo: string; 
    descripcion: string; 
    estado: string;
    tipo: number;
    editable: boolean;
    borrable: boolean;
    constructor()
    {
        this.id = "";
        this.codigo= ""; 
        this.descripcion= ""; 
        this.estado= "";
        this.tipo= 1;
        this.editable= false;
        this.borrable= false;
    }
}