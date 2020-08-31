import { Component, OnInit } from '@angular/core';
import csc from 'country-state-city';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
Details: any;
countryName: string;
stateName: string;
cardImageBase64: any;
  constructor() { }

  ngOnInit(): void {
    this.Details = JSON.parse(localStorage.getItem("Details"));
    if(this.Details) {
      this.countryName = csc.getCountryById(this.Details.personalDetails.country).name
      this.stateName = csc.getStateById(this.Details.personalDetails.state).name
      this.cardImageBase64 = this.Details.image;
    }
  }

}
