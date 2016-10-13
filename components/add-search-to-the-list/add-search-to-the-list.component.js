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
var paths_1 = require('../../app/paths');
var AddSearchToTheListComponent = (function () {
    function AddSearchToTheListComponent() {
        this.showFormProductos = false;
        this.urlApi = paths_1.Path.Server.API;
        this.path = '/productos';
        this.field = 'descripcion1';
        this.label = 'Producto:';
        console.log('> PARENT (DeployAutocompleteComponent)\n' +
            ' - urlApi : ' + this.urlApi + '\n' +
            ' - path   : ' + this.path + '\n' +
            ' - field  : ' + this.field + '\n' +
            ' - label  : ' + this.label + '\n');
        this.fieldsForm = [
            {
                label: 'Código',
                name: 'codigo',
                id: 'codigo',
                class: '_codigo',
            },
            {
                label: 'Descripción',
                name: 'descripcion',
                id: 'descripcion',
                class: '_descripcion',
            },
            {
                label: 'Valor unitario',
                name: 'valor_unitario',
                id: 'valor-unitario',
                class: '_valor-unitario',
            },
            {
                label: 'Marca',
                name: 'marca',
                id: 'marca',
                class: '_marca',
            },
            {
                label: 'Valor unitario',
                name: 'valor_unitario',
                id: 'valor-unitario',
                class: '_valor-unitario',
            },
            {
                label: 'Existencia',
                name: 'existencia',
                id: 'existencia',
                class: '_existencia',
            },
            ,
            {
                label: 'Cantidad',
                name: 'cantidad',
                id: 'cantidad',
                class: '_cantidad',
            }
        ];
    }
    AddSearchToTheListComponent.prototype.blurX = function (saludando) {
        this.showFormProductos = true;
        console.log('> HOLA >>> ' + Object.keys(saludando) + ' ' + Object.values(saludando));
        for (var campo in saludando) {
            console.log(' - ' + campo + '\n');
        }
        if (this.showFormProductos) {
            console.log('Muestra el formulario con los campos de busqueda diligenciados');
            return true;
        }
        console.log('NO muestra formulario ni resultados');
        return false;
    };
    AddSearchToTheListComponent.prototype.addList = function () {
        this.showFormProductos = false;
    };
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