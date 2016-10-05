import { Component, forwardRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DayComponent),
    multi: true
};
export class cDias{
    constructor(public id: number = 0,
    public nombre: number = 0){

    }
}
@Component({
    selector: 'rd-day-input',
    template: `<div>
                    <label><ng-content></ng-content>
                        <select [(ngModel)]="value" class="day-component"
                                class="form-control"  
                                (blur)="onBlur()" >
                                    <option *ngFor="let o of dias" [value]="o.id"  >{{ o.nombre }}</option>
                        </select>
                        <small>Valor actual: {{ value }}</small>
                    </label>
                </div>`,
    styles : [ `
        .day-component {
            background-color: blue;
        } `
    ],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DayComponent implements ControlValueAccessor, OnInit {

    //The internal data model
    private innerValue: any = '';
    private countDays: Number = 0;
    private lista_dias: Object[] = [];
    private dias: Object[] = [];
    //http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel
    
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
        console .log( '--> CHILD: DayComponent -> onBlur(): ' );
        this.onTouchedCallback();
        this.blur.emit(null);
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

    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    @Output() blur: EventEmitter<any> = new EventEmitter();
    //@Input() changeDays: EventEmitter<number> = new EventEmitter();
     constructor(    
    ) {}
    ngOnInit() {
        /*let data = new Date();
        this.my_year = data.getFullYear();*/
        this.countDays = 28;
        for(let i=1;i<=31;i++){
            //this.lista_dias.splice(i,0,new cDias(i,i));
            this.lista_dias.splice(i,0,{'id':i, 'nombre':i});
        }
        //this.lista_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
        this.dias = this.lista_dias;
    }
    @Input()
    set changeMonth(month: any){
        
        try{
            if(typeof(month) == 'string'){
                month = parseInt(month);
            }
                switch(month){
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        //this.dias = this.lista_dias.slice(0,31);
                        this.dias.splice(0,0, this.lista_dias.slice(0,31))
                        //this.dias.push({'id':this.dias.length, 'nombre':this.dias.length})
                        console.log('caso 1');
                        break;
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        this.dias.splice(0,0, this.lista_dias.slice(0,30))
                        //this.dias = this.lista_dias.slice(0,30);
                        console.log('caso 2');
                        break;
                    default:
                        //Febrero
                        //Evaluar año
                        //this.dias = this.lista_dias.slice(0,28);
                        this.dias.splice(0,0, this.lista_dias.slice(0,28))
                        console.log('caso 3 tipo=' + typeof(month) + '  mes=' + month);
                        break;
                }
                console.log('Fdo: Evento changeMonth desde componente Day -- mes=' + month + '  long=' + this.dias.length );
            
        }
        catch(e){
            console.log('ccc');
        }
    }
    
}
