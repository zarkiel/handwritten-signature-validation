export class Model{
    id!: string;

    status!: number;

    static parse(data: any){
        return Object.assign(new this(), data);
    }

    static map(data: any){
        return data.map((item: any) => Object.assign(new this(), item))
    }
}