
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";

import {RestaurantesListComponent} from "./components/restaurantes-list.component";

import {RestaurantesDetailComponent} from "./components/restaurantes-detail.component";
import {RestauranteAddComponent} from "./components/restaurante-add.component";
import {RestauranteEditComponent} from "./components/restaurante-edit.component";
 
// 1. pipe personalizado
import {PruebaPipe} from "./pipes/prueba.pipe";


/*	=================================================
	Ya estoy en app/
	OJO

	Llama a app/view/home.html  regresa a "app"
=================================================	*/
@Component({
	selector: "mi-app",
	templateUrl: "app/view/home.html",

	directives: [RestaurantesListComponent, ROUTER_DIRECTIVES],

	//2. pipes personalidas
	pipes: [PruebaPipe]

	/** 3. vista html
	{{ 4 | name_pipe:7 }}
	*/
})

/** Decorador RouteConfig */
@RouteConfig([
	{path: '/', name: "Home", component: RestaurantesListComponent, useAsDefault: true},

	{path: "/restaurante/:id", name: "Restaurante", component: RestaurantesDetailComponent},
	{path: "/crear-restaurante/", name: "CrearRestaurante", component: RestauranteAddComponent},
	{path: "/editar-restaurante/:id", name: "EditarRestaurante", component: RestauranteEditComponent},
	{path: "/donde-como-hoy/:random", name: "DondeComoHoy", component: RestaurantesDetailComponent},

])

export class AppComponent{
	public titulo:string = "Restaurantes";

}