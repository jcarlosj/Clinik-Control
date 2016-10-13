"use strict";
var FieldsForm = (function () {
    function FieldsForm(label, name, id_style, class_style) {
        if (label === void 0) { label = ''; }
        if (name === void 0) { name = ''; }
        if (id_style === void 0) { id_style = ''; }
        if (class_style === void 0) { class_style = ''; }
        this.label = label;
        this.name = name;
        this.id_style = id_style;
        this.class_style = class_style;
        this.setLabel(label);
        this.setName(name);
        this.setIdStyle(name);
        this.setClassStyle('_' + name);
    }
    FieldsForm.prototype.setLabel = function (label) {
        this.label = label;
    };
    FieldsForm.prototype.getLabel = function () {
        return this.label;
    };
    FieldsForm.prototype.setName = function (name) {
        this.name = name;
    };
    FieldsForm.prototype.getName = function () {
        return this.name;
    };
    FieldsForm.prototype.setIdStyle = function (id_style) {
        this.id_style = id_style;
    };
    FieldsForm.prototype.getIdStyle = function () {
        return this.id_style;
    };
    FieldsForm.prototype.setClassStyle = function (class_style) {
        this.class_style = class_style;
    };
    FieldsForm.prototype.getClassStyle = function () {
        return this.class_style;
    };
    return FieldsForm;
}());
exports.FieldsForm = FieldsForm;
//# sourceMappingURL=fields-form.js.map