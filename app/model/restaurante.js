System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Restaurante;
    return {
        setters:[],
        execute: function() {
            Restaurante = (function () {
                // new Restaurante( _id, title, descripcion, url, precio,  photo )
                function Restaurante(_id, title, description, url, precio, photo) {
                    this._id = _id;
                    this.title = title;
                    this.description = description;
                    this.url = url;
                    this.precio = precio;
                    this.photo = photo;
                }
                return Restaurante;
            }());
            exports_1("Restaurante", Restaurante);
        }
    }
});
//# sourceMappingURL=restaurante.js.map