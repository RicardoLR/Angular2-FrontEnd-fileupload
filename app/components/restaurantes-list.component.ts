import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";

import {RestauranteService} from "../services/restaurante.service";
import {Restaurante} from "../model/restaurante";

@Component({
	selector: "restaurantes-list",
	templateUrl: "app/view/restaurantes-list.html",
	directives: [ROUTER_DIRECTIVES],

	/** ====================================
		provider provedor de contenido

		inyectamos servicio a componente y usamos en contructor
		y agregar a Main el HTTP_PROVIDER
		import { HTTP_PROVIDERS }	from "angular2/http";

	==================================== */
	providers: [RestauranteService]
})


/** ====================================
	elemnntos de angular 2
	<any>, <HTMLElement>


==================================== */

export class RestaurantesListComponent implements OnInit {

	public titulo:string = "Listado de restaurantes:";

	// creacion de Areglo gracias a import {Restaurante} from "../model/restaurante";
	public restaurantes: Restaurante[];
	public status: string;
	public errorMessage;

	// para borrar
	public confirmado;

	constructor(private _restauranteService: RestauranteService){
	}

	/**  =================================
		metodo que se lanzara al inicio 
	================================= */
 	ngOnInit() {
		console.log("restaurantes-list component cargado");
 		this.getRestaurantes();
	}

	getRestaurantes(){

		/** ======================================================
		Loader "gif de cargando imagen"

		style.css clase .loading{ }


		====================================================== */
		let gif_loader = <HTMLElement>document.querySelector("#restaurantes-list .loading");
		gif_loader.style.visibility = "visible";

		/** ==========================================
		Metodo .subscribe()


		========================================== */
		this._restauranteService.getRestaurantes()
			.subscribe(

				result => {

						//console.log(JSON.stringify(result.data, null, 4));
						//console.log(result.data[0].photo[0]);

						this.restaurantes = result.data;
						//this.status = result.status;
						this.status = "success";

						console.log("result.status", result.status);
						/*
						if(this.status !== "success"){
							alert("Error en el servidor");
						}
						*/
						gif_loader.style.display = "none";
				},

				//< any > registra cualquier error
				error => {
					this.errorMessage = <any>error;
					
					if(this.errorMessage !== null){
						console.log("Error", this.errorMessage);
						alert("Error en la petición");
					}
				}

			);
	}

	onBorrarConfirm(id){
		this.confirmado = id;
	}

	onCancelarConfirm(id){
		this.confirmado = null;
	}

	onBorrarRestaurante(id){
		this._restauranteService.deleteRestaurante(id)
			.subscribe(
				result => {
						/*this.status = result.status;

						if(this.status !== "success"){
							alert("Error en el servidor");
						}
*/
						// llamo para actualizar los datos
						this.getRestaurantes();

				},
				error => {
					this.errorMessage = <any>error;
					
					if(this.errorMessage !== null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
			);
	}

}