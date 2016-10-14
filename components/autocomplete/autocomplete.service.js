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
var http_1 = require('@angular/http');
var AutoCompleteService = (function () {
    function AutoCompleteService(http) {
        this.http = http;
        console.log('constructor()');
    }
    AutoCompleteService.prototype.search = function (urlApi, tabla, campo, termino_busqueda) {
        console.log('search( urlApi: string, tabla:string, campo:string, termino_busqueda: string ): Observable<Object[]> {...}\n [ \n' +
            ' Configuración de búsqueda \n ---------------------------- \n' +
            ' - urlApi  : ' + urlApi + '\n' +
            ' - tabla   : ' + tabla + '\n' +
            ' - campo   : ' + campo + '\n' +
            ' - termino : ' + termino_busqueda + '\n' +
            ' - url     : ' + ("" + urlApi + tabla + "/?" + campo + "=" + termino_busqueda) + '\n ] \n');
        return this.http
            .get("" + urlApi + tabla + "/?" + campo + "=" + termino_busqueda)
            .map(function (r) { return r.json().data; });
    };
    AutoCompleteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AutoCompleteService);
    return AutoCompleteService;
}());
exports.AutoCompleteService = AutoCompleteService;
//# sourceMappingURL=autocomplete.service.js.map