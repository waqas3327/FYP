import { Component, OnInit } from '@angular/core';
import { UserService } from '../sdk/custom/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../sdk/custom/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  dataretrieved: any;
  email:any;
  
  getProfileData: FormGroup;
  clickedspinner = false;
  clickededit = false;
  calculatedRating: any;
  
  constructor(private userservice: UserService,
    private toastservice: ToastService,
    private router: Router,
    private formBuilder: FormBuilder) { this.backbutton() }
    backbutton() {
      console.log('backbutton');
      document.addEventListener('backbutton', () => {
        console.log('backbutton1');
    });
    }

 

  ngOnInit() {
    this.clickedspinner = false;
    this.clickededit = false;
    this.formInitializer();
    this.email = localStorage.getItem('name');
    console.log('this is email',this.email);
    this.userservice.getSingleUser(this.email).subscribe(
      userdata => {
        this.dataretrieved = userdata;
});  
      err => {
        console.log("api error in all request retrieval", err);
      }
  }

  ratingCalculator() {
    if(this.dataretrieved.data.count !== 0){
      console.log('count zero ha bhai..');
    this.calculatedRating = this.dataretrieved.data.rating/this.dataretrieved.data.count;
    this.calculatedRating = parseFloat(this.calculatedRating).toFixed(1);
    }
    else{
      this.calculatedRating = '  Not rated yet';
    }
   }

   ngAfterViewInit() {
    setTimeout (() => {
      this.ratingCalculator();
   }, 1000);
  }

  formInitializer() {
    this.getProfileData = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mnumber: ['', Validators.required],
      address: ['', Validators.required],
      rating: ['',Validators.required],
      count: ['',Validators.required]
     
    });
  }


  editclicked(){
    this.clickededit = true;
  }
  
  update(){
    this.clickedspinner=true;
      try {       
        const getpdata = this.getProfileData.value;
        this.userservice.UpdateUser(getpdata,this.email).subscribe(
          data => {
            const msg = "Success! Profile Updated Successfully.";
              this.toastservice.presentToast(msg);
            console.log('got response from server', data);
            this.router.navigate(['geolocation']);
          },
          error => {
            console.log('error', error);
            alert('Problem posting data!');
          }
        );
        } catch (ex) {
            console.log('ex', ex);
          }    
  }
}
