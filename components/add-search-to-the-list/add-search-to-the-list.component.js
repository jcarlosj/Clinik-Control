"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var AddSearchToTheListComponent = (function () {
    function AddSearchToTheListComponent() {
        this.showFormProductos = false;
        this.fields_form = [];
        this.data = new Object();
        this.dad = new core_1.EventEmitter();
        console.log('constructor()');
    }
    AddSearchToTheListComponent.prototype.ngOnInit = function () {
        console.log('ngOnInit()');
    };
    AddSearchToTheListComponent.prototype.ngOnDestroy = function () {
        console.log('ngOnDestroy()');
    };
    AddSearchToTheListComponent.prototype.blurX = function (saludando) {
        this.showFormProductos = true;
        if (this.showFormProductos) {
            console.log('Muestra el formulario con los campos de busqueda diligenciados');
            return true;
        }
        console.log('NO muestra formulario ni resultados');
        return false;
    };
    AddSearchToTheListComponent.prototype.addList = function () {
        this.showFormProductos = false;
        this.dad.emit('Hola papa');
        console.log('HEY! Daddy ');
        console.log('> RECIBE\n addList() \n [ \n' +
            '  - Object.keys( this.data ) \n' + Object.keys(this.data) + '\n\n' +
            '  - Object.values( this.data ) \n' + Object.values(this.data) + '\n ] \n ');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AddSearchToTheListComponent.prototype, "data", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AddSearchToTheListComponent.prototype, "dad", void 0);
    AddSearchToTheListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'add-search-to-the-list',
            templateUrl: 'add-search-to-the-list.component.html',
            styleUrls: ['add-search-to-the-list.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], AddSearchToTheListComponent);
    return AddSearchToTheListComponent;
}());
exports.AddSearchToTheListComponent = AddSearchToTheListComponent;
var AddSearchToTheListComponentByComponent = (function (_super) {
    __extends(AddSearchToTheListComponentByComponent, _super);
    function AddSearchToTheListComponentByComponent() {
        _super.apply(this, arguments);
    }
    return AddSearchToTheListComponentByComponent;
}(AddSearchToTheListComponent));
exports.AddSearchToTheListComponentByComponent = AddSearchToTheListComponentByComponent;
var AddSearchToTheListComponentByModule = (function (_super) {
    __extends(AddSearchToTheListComponentByModule, _super);
    function AddSearchToTheListComponentByModule() {
        _super.apply(this, arguments);
    }
    return AddSearchToTheListComponentByModule;
}(AddSearchToTheListComponent));
exports.AddSearchToTheListComponentByModule = AddSearchToTheListComponentByModule;
//# sourceMappingURL=add-search-to-the-list.component.js.map