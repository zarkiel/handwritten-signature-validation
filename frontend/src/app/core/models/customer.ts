import { Dictionary } from "./dictionary";
import { Model } from "./model";

export class Customer extends Model{
    name!: string;
    lastname1!: string;
    lastname2!: string;
    fullname!: string;
    document_type!: Dictionary;
    document_number!: string;

    images: string[] = [];
}