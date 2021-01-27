import { Component } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  name:string;
  email:string;
  avatar:string;

  constructor(private getdataService:GetdataService){}

  search(user:string):void{
   this.name=null;
    this.email=null;
    this.avatar=null;
    this.getdataService.get(user).subscribe( 
      (dataUser:any)=> {
        this.name=dataUser.name;
        this.email=dataUser.email;
        this.avatar=dataUser.avatar_url;
        console.log(dataUser)
      }
    )
  }
  
  title = 'api';
}
