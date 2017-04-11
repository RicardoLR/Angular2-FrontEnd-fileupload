System.register(["angular2/core", "angular2/http", "rxjs/add/operator/map"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var RestauranteService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            /** ======================================================
                Conetamos con rest de favoritos de Node
            
            
                
            ====================================================== */
            RestauranteService = (function () {
                function RestauranteService(_http) {
                    this._http = _http;
                }
                RestauranteService.prototype.getRestaurantes = function () {
                    return this._http.get("http://localhost:3030/api/favoritos").map(function (res) { return res.json(); });
                };
                RestauranteService.prototype.getRestaurante = function (id, random) {
                    if (random === void 0) { random = null; }
                    /** ========================================================
                        mapapeamos en una variable la respuesta en "res"
                    ======================================================== */
                    if (random == null) {
                        return this._http.get("http://localhost:3030/api/favorito/" + id).map(function (res) { return res.json(); });
                    }
                    else {
                        return this._http.get("http://localhost:3030/api/favorito-random").map(function (res) { return res.json(); });
                    }
                };
                RestauranteService.prototype.addRestaurante = function (restaurante) {
                    var json_restaurante = JSON.stringify(restaurante);
                    /* ===========================================
                    para recibir un post, no un JSON
                
                    let params = "json="+json;
                    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
            
            
                    return this._http.post("http://localhost:3030/api/favorito",
                            params, {headers: headers}).map(res => res.json());
                    =========================================== */
                    //console.log(JSON.stringify(restaurante));
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    return this._http.post("http://localhost:3030/api/favorito", json_restaurante, { headers: headers }).map(function (res) { return res.json(); });
                };
                RestauranteService.prototype.editRestaurante = function (id, restaurante) {
                    var json = JSON.stringify(restaurante);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    return this._http.put("http://localhost:3030/api/favorito/" + id, json, { headers: headers }).map(function (res) { return res.json(); });
                };
                /** actualizara favorito, sibira imagen y la agregara al array de photo */
                /*
                    updateFavoritoAddImages(id: string, restaurante: Restaurante, avatar: File) {
                        let json = JSON.stringify(restaurante);
                
                        let formData = new FormData();
                    formData.append("avatar", avatar);
                    console.log("formData", formData);
                
                        let headers = new Headers({'Content-Type':'application/json'});
                        headers.append('Content-Type', 'multipart/form-data');
                
                
                        return this._http.put("http://localhost:3030/api/favorito/imagen/"+id,
                            formData, {headers: headers}).map(res => res.json());
                    }
                
                    addJustImage(avatar: File) {
                    console.log("addJustImage cargado solo imagen a REST");
                
                        let formData1 = new FormData();
                    formData1.append("avatar", avatar);
                    console.log("formData", formData1);
                
                        let headers = new Headers({'Content-Type':'application/json'});
                        headers.append('Content-Type', 'multipart/form-data');
                
                
                        return this._http.post("http://localhost:3030/api/favorito/imagen/", formData1, {headers: headers}).map(res => res.json());
                
                    }*/
                // llamado en componente list
                RestauranteService.prototype.deleteRestaurante = function (id) {
                    return this._http.delete("http://localhost:3030/api/favorito/" + id)
                        .map(function (res) { return res.json(); });
                };
                RestauranteService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], RestauranteService);
                return RestauranteService;
            }());
            exports_1("RestauranteService", RestauranteService);
        }
    }
});
//# sourceMappingURL=restaurante.service.js.map