export interface Response<T> {
    token?: string;
    fireToken?:string,
    msg?: string;
    obj?: T;
    error?: { msg: string };
}