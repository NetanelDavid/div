import { AngularFireStorageReference } from "@angular/fire/storage";

export class FileFire {

    sorageRef: AngularFireStorageReference;
    file: File;

    constructor(file: File) {
        this.file = file;
    }

}