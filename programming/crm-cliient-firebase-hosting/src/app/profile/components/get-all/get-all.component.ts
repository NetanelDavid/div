import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.scss']
})
export class GetAllComponent implements OnInit {

  allUsers: User[];

  constructor(private profile: ProfileService) {
    this.allUsers = [];
    this.getAll();
  }

  getAll(): void {
    this.profile.getAll().subscribe(
      u => {
        this.allUsers = u.obj;
        console.log(u);
      });
  }

  ngOnInit(): void {
  }

}
