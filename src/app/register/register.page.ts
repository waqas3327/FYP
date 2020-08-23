import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../sdk/custom/user.service';
import { Subscription } from 'rxjs';
import { LoaderService } from '../sdk/custom/loader.service';
import { AlertService } from '../sdk/custom/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loading = false;
  public clicked = false;
  getData: FormGroup;
  constructor(private alertservice: AlertService,private fb: FormBuilder,private loaderservice: LoaderService,private router: Router, private uuserService: UserService) { this.backbutton(); }
  backbutton() {
    console.log('backbutton');
    document.addEventListener('backbutton', () => {
      console.log('backbutton1');
  });
  this.loaderservice.showLoader();
  }
  ngOnInit() {
    this.formInitializer();
    this.loaderservice.hideLoader();
  }
  formInitializer() {
    this.getData = this.fb.group({
      name: ['', Validators.required],
      mnumber: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.matchOtherValidator('password')
        ]
      ]
    });
  }
  matchOtherValidator(otherControlName: string) {
    return (control: AbstractControl): { [key: string]: any } => {
      const otherControl: AbstractControl = control.root.get(otherControlName);

      if (otherControl) {
        const subscription: Subscription = otherControl.valueChanges.subscribe(
          () => {
            control.updateValueAndValidity();
            subscription.unsubscribe();
          }
        );
      }

      return otherControl && control.value !== otherControl.value
        ? { match: true }
        : null;
    };
  }
SaveToDB() {
    this.clicked = true;
    this.loading = true;
    this.uuserService.userRegister(this.getData.value).subscribe(
      data => {
        console.log('got response from server', data);
        this.alertservice.presentAlertConfirm("Registeration Succesfull!","Success");
        this.loading = false;
        this.router.navigateByUrl('/home');
      },
      error => {
        this.clicked = false;
        this.loading = false;
        console.log('error', error);
        this.alertservice.presentAlertConfirm("Registeration Failed! User Already exists.","Failed")
      }
    );
  }
}
