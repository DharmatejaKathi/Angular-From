import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  FormArray,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { groupBy } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'BasicFrom';

  public addressOptions = [
    { label: 'Hyderabad, Telangana', value: 'hyderabad' },
    { label: 'Bengaluru, Karnataka', value: 'bengaluru' },
    { label: 'Mumbai, Maharashtra', value: 'mumbai' },
    { label: 'Chennai, Tamil Nadu', value: 'chennai' },
    { label: 'Delhi, New Delhi', value: 'delhi' },
    { label: 'Kolkata, West Bengal', value: 'kolkata' },
  ];

  submitted = false;

  userFrom: FormGroup = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mail: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.min(10)]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(6),
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        ),
      ]),
      confirmPassword: new FormControl('', Validators.required),
      addresses: new FormArray([]),
    },
    { validators: App.passwordMatchValidator() }
  );

  static passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  constructor() {
    this.addAddress();
  }

  get addresses(): FormArray {
    return this.userFrom.get('addresses') as FormArray;
  }

  createAddressGroup(): FormGroup {
    return new FormGroup({
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zipCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{5,6}$'),
      ]),
      address: new FormControl('', Validators.required),
    });
  }

  addAddress(): void {
    this.addresses.push(this.createAddressGroup());
  }

  onSubmitButton() {
    this.submitted = true;
    console.log(this.userFrom.value);
  }
}
