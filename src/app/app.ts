import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'BasicFrom';

  submitted = false;

  userFrom: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mail: new FormControl(),
    phone: new FormControl('', [Validators.required, Validators.min(10)]),
  });

  onSubmitButton() {
    this.submitted = true;
    console.log(this.userFrom.value);
  }
}
