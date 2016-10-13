export class FieldsForm {
    constructor(
        private label       : string = '',
        private name        : string = '',
        private id_style    : string = '',
        private class_style : string = ''
    ) {
        this .setLabel( label );
        this .setName( name );
        this .setIdStyle( name );
        this .setClassStyle( '_'+name );
    }

    setLabel( label : string ) {
        this .label = label;
    }
    getLabel() : string {
        return this .label;
    }

    setName( name: string ) {
        this .name = name;
    }
    getName() : string {
        return this .name;
    }
    
    setIdStyle( id_style : string ) {
        this .id_style = id_style;
    }
    getIdStyle() : string {
        return this .id_style;
    } 
    
    setClassStyle( class_style : string ) {
        this .class_style = class_style;
    }
    getClassStyle() : string {
        return this .class_style;
    }
}