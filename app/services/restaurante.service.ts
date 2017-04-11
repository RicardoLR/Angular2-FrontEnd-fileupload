
import {Injectable} from "angular2/core";
import {Http, Response, Headers} from "angular2/http";

import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

import {Restaurante} from "../model/restaurante";

/** ======================================================
	Conetamos con rest de favoritos de Node


	
====================================================== */


@Injectable()
export class RestauranteService{

	/** el constructor no contiene lógica extra
    	su función es únicamente recibir las dependencias
     */
	constructor(private _http: Http){
	}

	getRestaurantes(){
		return this._http.get(
			"http://localhost:3030/api/favoritos"
			).map(res => res.json())
			/*
			.filter( (e) => { 
				console.log("- e", e); 
			}); 
			*/
	}

	getRestaurante(id: string, random = null){
		
		/** ========================================================
			mapapeamos en una variable la respuesta en "res"
		======================================================== */
		if(random == null){
			return this._http.get(
				"http://localhost:3030/api/favorito/"+id
			).map(res => res.json());
		
		}else{
			return this._http.get(
				"http://localhost:3030/api/favorito-random"
			).map(res => res.json());
		}
		
	}

	addRestaurante(restaurante: Restaurante) {
		let json_restaurante = JSON.stringify(restaurante);

		/* ===========================================
		para recibir un post, no un JSON
	
		let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});


		return this._http.post("http://localhost:3030/api/favorito", 
				params, {headers: headers}).map(res => res.json());
		=========================================== */		

		//console.log(JSON.stringify(restaurante));

		let headers = new Headers({'Content-Type':'application/json'});


		return this._http.post(
			"http://localhost:3030/api/favorito", 
			json_restaurante, {headers: headers}
		).map(res => res.json());


	}

	editRestaurante(id: string, restaurante: Restaurante) {
		let json = JSON.stringify(restaurante);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.put("http://localhost:3030/api/favorito/"+id, 
				json, {headers: headers}).map(res => res.json());
	}

/** actualizara favorito, subira imagen y la agregara al array de photo */
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
	deleteRestaurante(id: string){
		return this._http.delete("http://localhost:3030/api/favorito/"+id)
			.map(res => res.json());
	}


}
