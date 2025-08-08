import { Model } from "./model";

export class SystemPage extends Model{
    name!: string;
    category!: string;
    subcategory!: string;
    operations!: string[]

    can(operation: string){
        return true;
        //if(!this.operations)
        //    return false;

        //console.log(operation)
        //console.log(this.operations)
        //return this.operations.includes(operation)
    }
}