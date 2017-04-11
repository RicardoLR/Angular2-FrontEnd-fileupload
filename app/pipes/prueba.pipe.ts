
import {Pipe, PipeTransform} from "angular2/core";

@Pipe({
	name: "name_pipe"
})

export class PruebaPipe implements PipeTransform{
	
	// en version RC   (value: number, por:number)
	transform(value, [por]):string {

		let valuev = parseInt(value);
		let porv = parseInt(por);

		let result = "La multiplicacion"+value+ " x "+ porv + "=" + (valuev*porv);
		
		return result;
	}
}




