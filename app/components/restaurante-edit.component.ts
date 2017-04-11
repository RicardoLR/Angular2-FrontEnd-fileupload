
import {Component, OnInit} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";
import {Restaurante} from "../model/restaurante";

/** Usaremos la misma vista para agregar como para editar */
@Component({
	selector: "restaurante-edit",
	templateUrl: "app/view/restaurante-add.html",
	providers: [RestauranteService]
})

export class RestauranteEditComponent implements OnInit {
	public titulo = "Editar restaurante";
	public restaurante: Restaurante;
	public errorMessage: string;
	public status: string;
	public message: string;
	public filesToUpload: Array<File>;

	public avatar: File;


	constructor(
		private _restauranteService: RestauranteService,
		private _routeParams: RouteParams,
		private _router: Router
	){}


	onSubmit(){

	 let id = this._routeParams.get("id");
	 
	 this._restauranteService.editRestaurante(id, this.restaurante).subscribe(
			response => {
				this.message = response.message;
				if(this.message !== "exitoso"){
					alert("Error en el servidor");
				}
			},
			error => {
				this.errorMessage = <any>error;
			
				if(this.errorMessage !== null){
					console.log(this.errorMessage);
					alert("Error en la petición");
				}
			}
		);
	
		this._router.navigate(["Home"]);
	}

	ngOnInit(){

		// new Restaurante( _id, title, descripcion, url, photo )
		this.restaurante = new Restaurante(
								parseInt(this._routeParams.get("id")),
								this._routeParams.get("title"),
								this._routeParams.get("description"),
								"null",
								0,
								//this._routeParams.get("photo")
								"null"
								);
		this.getRestaurante();
	}

	getRestaurante(){
		let id = this._routeParams.get("id");
		this._restauranteService.getRestaurante(id)
		.subscribe(
			response => {
					this.restaurante = response.data;
					/*this.status = response.status;

					if(this.status !== "success"){
						this._router.navigate(["Home"]);
					}*/
			},
			error => {
				this.errorMessage = <any>error;
				
				if(this.errorMessage !== null){
					console.log(this.errorMessage);
					alert("Error en la petición");
				}
			});
	}

	callPrecio(value){
		this.restaurante.precio = value;
	}


	/** =================================================== 
		update de favorito, agrega imagen y lo agrega su array photo

		this.restaurante se le agrega informacion en la vista html, 
		no hay scope lo hace directo
	=================================================== */
	public resultUpload;
	fileChangeEvent(fileInput: any){

		console.log("fileChangeEvent  procesando edit component");

		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log("this.filesToUpload", this.filesToUpload);

		/** =================================================== 
		sube la image y guarda referencia del ID en restaurante
		=================================================== */
		this.makeFileRequest("http://localhost:3030/api/favorito/imagen", [], this.filesToUpload).then((result) => {

				console.log("result", result);
				this.resultUpload = result;
				//this.restaurante.photo = this.resultUpload.filename;
				this.restaurante.photo = this.resultUpload.fileId;
		}, (error) =>{
			console.log(error);
		});		
	}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>){
		return new Promise((resolve, reject) => {
				var formData: any = new FormData();
				var xhr = new XMLHttpRequest();

				for(var i = 0; i < files.length; i++){
					formData.append("avatar", files[i], files[i].name);
				}

				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4){
						if(xhr.status == 200){
							resolve(JSON.parse(xhr.response));
						}else{
							reject(xhr.response);
						}
					}
				}
				console.log("formData", formData);

				xhr.open("POST", url, true);
				xhr.send(formData);
			});
	}

}