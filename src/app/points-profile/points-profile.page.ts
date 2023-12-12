import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-points-profile',
  templateUrl: './points-profile.page.html',
  styleUrls: ['./points-profile.page.scss'],
})
export class PointsProfilePage implements OnInit {
  profileID = '';
  profileName = '';
  profileBday = '';
  profilePref = '';
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      const name = params['name'];
      const bday = params['bday'];
      const pref = params['pref'];
      console.log('Received data:', id, name, bday, pref);
      this.profileID = id;
      this.profileName = name;
      this.profileBday = bday;
      this.profilePref = pref;
    });
  }
  back() {
    this.router.navigate(['home']);
  }
}
