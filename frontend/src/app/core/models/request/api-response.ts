export interface ApiResponse<T>{
    status: string;
    data: T,
    meta: any
}