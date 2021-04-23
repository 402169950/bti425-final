import { Component, OnInit } from '@angular/core';
import { NgForm, PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';
import bcrypt from 'bcryptjs';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  signinFormEntity: SigninFormEntity = new SigninFormEntity();
  submittedFormEntity: SigninFormEntity = new SigninFormEntity();
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onSubmit(ngForm: NgForm) {
    let value = ngForm.value;
    if (this.validateFields()) {
      this.submittedFormEntity.userName = value.userName;
      bcrypt
        .genSalt(12)
        .then((salt) => {
          return bcrypt.hash(value.password, salt);
        })
        .then((hashedPwd) => {
          this.submittedFormEntity.password = hashedPwd;
          this.login(value.userName, value.password);
        })
        .catch((err) => {
          this.submittedFormEntity.password = `Could not hash the password! err${err}`;
        });
    }
  }
  validateFields() {
    let regex = new RegExp('^[a-zA-Z0-9_.-]*$');
    return (
      regex.test(this.signinFormEntity.userName) &&
      regex.test(this.signinFormEntity.password)
    );
  }
  login(userName, password) {
    if (userName == 'bob' && password == 'myPassword') {
      this.router.navigate(['contactus']);
    }
  }
}

export class SigninFormEntity {
  public userName: string;
  public password: string;
  public errorMessage: string;
}
