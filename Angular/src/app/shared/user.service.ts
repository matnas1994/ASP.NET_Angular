import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootURL = "https://localhost:44335/api";

  constructor(private fb:FormBuilder, private http: HttpClient) { }

  formModel = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.email],
    FullName : [''],
    Passwords : this.fb.group({
      Password : ['',  [Validators.required, Validators.minLength(4)]],
      ConfirmPassword : ['',  Validators.required]
    },{validators: this.comparePasswords})
  });

  comparePasswords(fb:FormGroup){
    let ConfirmPswrdCtrl = fb.get("ConfirmPassword");
    //passwordMismatch
    //ConfirmPswrdCtrl.error={passwordMismatch:true}
    if(ConfirmPswrdCtrl.errors == null || 'passwordMismatch' in ConfirmPswrdCtrl.errors){
        if(fb.get("Password").value != ConfirmPswrdCtrl.value)
          ConfirmPswrdCtrl.setErrors({passwordMismatch:true});
        else
          ConfirmPswrdCtrl.setErrors(null);
    }
  }

  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.rootURL+'/ApplicationUser/Register', body);
  }

  login(formData){
    return this.http.post(this.rootURL+'/ApplicationUser/Login', formData);
  }

  getUserProfile(){
    return this.http.get(this.rootURL+'/UserProfile');
  }
}
