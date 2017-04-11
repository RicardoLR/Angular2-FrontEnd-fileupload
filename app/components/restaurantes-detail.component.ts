import {Component, OnInit} from "angular2/core";

// necesitamos RouteParams 
import {Router, RouteParams} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";
import {Restaurante} from "../model/restaurante";


/** =============================================
	Componente para pagina con id del elemento a mostrar

============================================= */
@Component({
	selector: "restaurantes-detail",
	templateUrl: "app/view/restaurante-detail.html",
	providers: [RestauranteService]
})

export class RestaurantesDetailComponent implements OnInit {
	public restaurante: Restaurante[];
	public errorMessage: string;
	public status: string;

	constructor(
		private _restauranteService: RestauranteService,
		private _routeParams: RouteParams,
		private _router: Router
	){}

	ngOnInit(){
		this.getRestaurante();
	}

	getRestaurante(){
		let id = this._routeParams.get("id");
		let random = this._routeParams.get("random");

		this._restauranteService.getRestaurante(id, random)
			.subscribe(
				response => {
						this.restaurante = response.data;

						console.log("response.status",  response.status);
						/*
						this.status = response.status;
						
						// sino existe, redirigir a Home 
						if(this.status !== "success"){
							// alert("Error en el servidor");
							this._router.navigate(["Home"]);
						}
						*/
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