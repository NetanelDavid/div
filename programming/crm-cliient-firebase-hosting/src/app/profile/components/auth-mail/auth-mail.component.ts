import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-auth-mail',
  templateUrl: './auth-mail.component.html',
  styleUrls: ['./auth-mail.component.scss']
})
export class AuthMailComponent implements OnInit {
  success: boolean;
  msg: string;

  constructor(private route: ActivatedRoute, private profile: ProfileService) {
    this.route.params.subscribe(
      params => {
        this.profile.testAuth(params.code).subscribe(res => {
          this.msg = res.msg;
          this.success = true;
        }, err => {
          this.msg = err.error.msg;
          this.success = false;
        }
        );
      }
    );
  }
  
  ngOnInit() { }

}
