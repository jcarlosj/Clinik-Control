import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MonthComponent),
    multi: true
};
export class tipo_mes{
    constructor(public id: number = 0,
    public nombre: string = ''){

    }

}
@Component({
    selector: 'rd-month-input',
    template: `<div>
                    <label><ng-content></ng-content>
                        <select [(ngModel)]="value" class="month-component" 
                                class="form-control" 
                                (blur)="onBlur()" >
                                    <option [value]="o.id" *ngFor="let o of lista_meses">{{ o.nombre }}</option>
                        </select>
                    </label>
                    <small>Valor actual: {{ value }}</small>
                </div>`,
    styles : [ `
        .month-component {
            background-color: blue;
        }`
    ],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MonthComponent implements ControlValueAccessor {

    //The internal data model
    private innerValue: any = '';
    // Lista de Meses
    private lista_meses = [
        new tipo_mes(1, 'Enero'),
        new tipo_mes(2, 'Febrero'),
        new tipo_mes(3, 'Marzo'),
        new tipo_mes(4, 'Abril'),
        new tipo_mes(5, 'Mayo'),
        new tipo_mes(6, 'Junio'),
        new tipo_mes(7, 'Julio'),
        new tipo_mes(8, 'Agosto'),
        new tipo_mes(9, 'Septiembre'),
        new tipo_mes(10, 'Octubre'),
        new tipo_mes(11, 'Noviembre'),
        new tipo_mes(12, 'Diciembre'),
    ]
    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    @Input() 
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        console .log( '--> CHILD: MonthComponent -> onBlur(): ' );
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
        this.change.emit(null);
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    @Output() change: EventEmitter<any> = new EventEmitter();
    
}
