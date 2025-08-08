import { Dictionary } from "./dictionary";


export interface Worker {
    id: string;
    name: string;
    lastname1: string;
    lastname2: string;
    fullname: string;
    document_type: Dictionary;
    document_number: string;
    photo: string;
}