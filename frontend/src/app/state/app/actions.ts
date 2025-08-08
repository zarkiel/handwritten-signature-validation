import { IAppState } from "./state";

export namespace AppActions{
    export class Initialize{
        static readonly type = '[App] Initialize';

        constructor(public state: IAppState){
        }
    }
}