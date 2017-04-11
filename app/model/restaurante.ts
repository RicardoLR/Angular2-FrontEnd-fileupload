export class Restaurante{

	// new Restaurante( _id, title, descripcion, url, precio,  photo )
	constructor(
		public _id:number,
		public title:string,
		public description:string,
		public url:string,
		public precio:number,
		public photo:string
	){}
}

