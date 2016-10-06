"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var autocomplete_service_1 = require('../autocomplete/autocomplete.service');
var noop = function () {
};
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return AutocompleteComponent; }),
    multi: true
};
var AutocompleteComponent = (function () {
    function AutocompleteComponent(autocompleteService) {
        this.autocompleteService = autocompleteService;
        this.desarrollador = [{ nombre: 'Samir', profesion: 'peligro', edad: 34 }];
        this.obj = new Object();
        this.searchTerms = new Subject_1.Subject();
        this.razon_social = '';
        this.inputFocused = new core_1.EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.innerValue = '';
        this.blur = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
        console.log('-> CHILD (AutocompleteComponent) constructor()');
    }
    AutocompleteComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    Object.defineProperty(AutocompleteComponent.prototype, "value", {
        get: function () {
            return this.innerValue;
        },
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    AutocompleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('-> CHILD (AutocompleteComponent) ngOnInit()');
        console.log(' - this .api + this .tabla : ' + this.urlApi + this.tabla);
        console.log(' - this .campo             : ' + this.campo);
        console.log(' - this .etiqueta          : ' + this.etiqueta);
        this.terceros = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return term
            ? _this.autocompleteService.search(_this.urlApi + _this.tabla, _this.campo, term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    AutocompleteComponent.prototype.ngOnDestroy = function () { };
    AutocompleteComponent.prototype.onBlur = function (obj) {
        console.log('--> CHILD: AutocompleteComponent -> onBlur(): ');
        console.log('--> obj: ' + Object.values(obj));
        this.onTouchedCallback();
        this.blur.emit(obj);
    };
    AutocompleteComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    AutocompleteComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
        this.change.emit(null);
    };
    AutocompleteComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    AutocompleteComponent.prototype.showDetail = function (obj) {
        this.objSelected = obj;
        console.log('--> CHILD: AutocompleteComponent -> showDetail()');
        console.log(' - obj: " \n' + Object.values(this.obj));
        this.blur.emit(obj);
        console.log(' - obj.campo: ' + obj[this.campo]);
        if (obj[this.campo] != '') {
            this.obj = obj;
            this.campo = obj[this.campo];
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutocompleteComponent.prototype, "obj", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutocompleteComponent.prototype, "tabla", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutocompleteComponent.prototype, "campo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutocompleteComponent.prototype, "etiqueta", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutocompleteComponent.prototype, "urlApi", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutocompleteComponent.prototype, "value", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AutocompleteComponent.prototype, "blur", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AutocompleteComponent.prototype, "change", void 0);
    AutocompleteComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'autocomplete',
            templateUrl: 'autocomplete.component.html',
            styleUrls: ['autocomplete.component.css'],
            providers: [autocomplete_service_1.AutoCompleteService]
        }), 
        __metadata('design:paramtypes', [autocomplete_service_1.AutoCompleteService])
    ], AutocompleteComponent);
    return AutocompleteComponent;
}());
exports.AutocompleteComponent = AutocompleteComponent;
//# sourceMappingURL=autocomplete.component.js.map