import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class signOutComponent implements OnInit {

  constructor(private profile: ProfileService, private router: Router) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this.profile.signOut();    
    this.router.navigate(['profile']);
  }

}
