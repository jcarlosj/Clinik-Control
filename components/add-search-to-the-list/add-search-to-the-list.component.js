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
var fields_form_1 = require('./fields-form');
var AddSearchToTheListComponent = (function () {
    function AddSearchToTheListComponent() {
        this.showFormProductos = false;
        this.fields_form = [];
        this.data = [];
        this.urlApi = paths_1.Path.Server.API;
        this.path = '/productos';
        this.field = 'descripcion1';
        this.label = 'Producto:';
        console.log('> PARENT (DeployAutocompleteComponent)\n' +
            ' - urlApi : ' + this.urlApi + '\n' +
            ' - path   : ' + this.path + '\n' +
            ' - field  : ' + this.field + '\n' +
            ' - label  : ' + this.label + '\n');
    }
    AddSearchToTheListComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('++++++++++++++++++++\n' + this.data + '\n++++++++++++++++++++');
        this.data.forEach(function (element) {
            console.log(' ==> LABEL ' + element.label + '\n ==> NAME ' + element.name);
        });
        this.data.forEach(function (element) {
            _this.fields_form.push(new fields_form_1.FieldsForm(element.label, element.name));
        });
        this.fields_form.forEach(function (element) {
            console.log('>> label: ' + element['label'] + ', name: ' + element['name'] + ', id: ' + element['id_style'] + ', class: ' + element['class_style']);
        });
    };
    AddSearchToTheListComponent.prototype.ngOnDestroy = function () {
    };
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AddSearchToTheListComponent.prototype, "data", void 0);
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