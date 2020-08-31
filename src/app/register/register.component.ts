import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IState, ICity } from 'country-state-city';
import { Router } from '@angular/router';
import csc from 'country-state-city';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;
  AllCountries: any[];
  states: IState[] = csc.getStatesOfCountry('101');
  cities: ICity[];
  phoneCode: string = '+91';
  shortName: string = 'in';
  fileToUpload: File = null;
  client: any;
  // selectedFile: ImageSnippet;
  cardImageBase64: any;

  constructor(private _formBuilder: FormBuilder,elementRef:ElementRef, public router: Router) { }

  ngOnInit(): void {
  this.AllCountries = csc.getAllCountries();
  this.firstFormGroup = this._formBuilder.group({
    fullName: ['', Validators.required],
    gender: ['Male', Validators.required],
    country: ['101', Validators.required],
    state: ['', Validators.required],
    phone: ['', Validators.required],
  });
  this.secondFormGroup = this._formBuilder.group({
    companyName: ['', Validators.required],
    emailId: ['',[Validators.required, Validators.email] ],
    JobTitle: ['',Validators.required ],
    experience: ['',Validators.required ],
    terms: [false,Validators.requiredTrue],
  });
}

getState(country) {
  this.states = csc.getStatesOfCountry(country);
  this.phoneCode = '+' + csc.getCountryById(country).phonecode;
  this.shortName = csc.getCountryById(country).sortname.toLocaleLowerCase();
}

getOTP() {
  var otp = '';
  document.getElementsByName("otp").forEach((x: any) => {
   otp = otp + x.value;
  });
}

handleFileInput(imageInput: any) {
  const reader = new FileReader();
  reader.onload = (e: any) => {
    const image = new Image();
    image.src = e.target.result;
    image.onload = rs => {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
        
    };
};


  reader.readAsDataURL(imageInput.target.files[0]);
}

setDataInLocalStorage() {
  var Details = {
    personalDetails: this.firstFormGroup.value,
    companyDetails: this.secondFormGroup.value,
    image: this.cardImageBase64 ? this.cardImageBase64 : null
  }
  localStorage.setItem("Details", JSON.stringify(Details));
  this.router.navigate(['/profile']);
}

}