import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  msg: String;
  click: boolean;
  user: User;

  constructor(private profile: ProfileService) {
    this.msg = '';
    this.user = profile.getUser();
  }


  ngOnInit(): void {
  }

  deleteProfile(): void {
    this.profile.deleteProfile(this.user).then(
      res => {
        this.msg = res.msg;
        this.click = true;
      }
    );
  }

}
