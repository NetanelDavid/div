import { FileFire } from "src/app/server/firebase/FilleFire.class";

export interface FileForm {
    fileFire?: FileFire,
    readonly: boolean,
    src : string
}