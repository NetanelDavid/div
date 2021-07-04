import { FileFire } from "src/app/server/firebase/FilleFire.class";

export interface FormOut<T> {
    value? :T,
    files?: { [key: string]: FileFire }
}