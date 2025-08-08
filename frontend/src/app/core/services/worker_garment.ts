import { Dictionary } from "../models/dictionary";
import { Model } from "../models/model";

export class WorkerGarment extends Model{
    garment!: Dictionary;
    size!: string;
}