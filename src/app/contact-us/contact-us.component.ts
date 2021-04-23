import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  inputContactEntity: ContactEntity = new ContactEntity();
  submitContactEntity: ContactEntity = new ContactEntity();
  isSubmitted: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    let value = form.value;
    if (this.validateFields()) this.isSubmitted = true;
    else this.isSubmitted = false;
  }
  validateFields() {
    let nameRegex = new RegExp('^[a-zA-Z0-9_.-]*$');
    let emailRegex = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/);
    // let emailRegex = new RegExp();
    return (
      nameRegex.test(this.inputContactEntity.name) &&
      this.inputContactEntity.email &&
      emailRegex.test(this.inputContactEntity.email) &&
      this.inputContactEntity.message
    );
  }
}
export class ContactEntity {
  name: string;
  email: string;
  message: string;
}
