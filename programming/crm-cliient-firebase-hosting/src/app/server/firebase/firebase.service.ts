import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { FileFire } from './FilleFire.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private storage: AngularFireStorage) {}

  uploadToStorage(path: string, fileFire: FileFire, getref?: boolean): Observable<number> {

    if (getref) {
      fileFire.sorageRef = this.storage.ref(path);
    }
    return this.storage.upload(path, fileFire.file).percentageChanges();
  }

  getUrl(path: string): Promise<string> {
    return new Promise(
      resolve => this.storage.ref(path).getDownloadURL().subscribe(url => resolve(url))
    )

  }

  deletFile(url: string): Promise<void> {
    return new Promise(
      async resolve => {
        return resolve(await this.storage.refFromURL(url).delete().toPromise())
      }
    )
  }

}
