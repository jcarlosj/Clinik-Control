import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => YearComponent),
    multi: true
};

@Component({
    selector: 'rd-year-input',
    template: `<div class="form-group">
                    <label><ng-content></ng-content>
                        <input  class="year-component"
                                maxlength="4"
                                size="4"
                                [(ngModel)]="value"  
                                class="form-control" 
                                (blur)="onBlur()" >
                    </label>
                </div>
                <small>Valor actual: {{ value }}</small>`
                ,
    styles : [ `
        .year-component {
            background-color: blue;
        }`
    ],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class YearComponent implements ControlValueAccessor {

    //The internal data model
    private innerValue: any = '';

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
        console .log( '--> CHILD: YearComponent -> onBlur(): ' );
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
}
