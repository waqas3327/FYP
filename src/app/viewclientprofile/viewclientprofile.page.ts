import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../sdk/custom/user.service';
import { ToastService } from '../sdk/custom/toast.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoaderService } from '../sdk/custom/loader.service';


@Component({
  selector: 'app-viewclientprofile',
  templateUrl: './viewclientprofile.page.html',
  styleUrls: ['./viewclientprofile.page.scss'],
})
export class ViewclientprofilePage implements OnInit {
  sub: any;
  queryParameters: number;
  clientemail: any;
  getProfileData: FormGroup;
  dataretrieved: any;
  rateclicked = false;
  calculatedRating:any;
  show = false;
  
  userrating:any;
  ratedsuccessfully: boolean = true;

  constructor(private loaderservice: LoaderService,private route: ActivatedRoute,private userservice: UserService,
    private toastservice: ToastService,
    private router: Router,
    private formBuilder: FormBuilder, private service: UserService) { this.backbutton() }
    backbutton() {
      console.log('backbutton');
      document.addEventListener('backbutton', () => {
        console.log('backbutton1');
    });
    this.loaderservice.showLoader();
    }

    

    logRatingChange(rating){
      this.userrating = rating;
      console.log("changed rating: ",rating);
      // do your stuff
  }
  userRated(){

    try {       
      const count1 = this.dataretrieved.data.count + 1;
      console.log('count vlue',count1);
      const rated = this.dataretrieved.data.rating + this.userrating;
      this.getProfileData.patchValue({rating: rated});
      this.getProfileData.patchValue({count: count1});
      
      const getpdata = this.getProfileData.value;
     
      this.userservice.UpdateRating(getpdata,this.dataretrieved.data.email).subscribe(
        data => {
          const msg = "Success! User Rated Successfully.";
            this.toastservice.presentToast(msg);
            this.ratedsuccessfully = false;
            
          console.log('got response from server', data);
          this.router.navigate(['lost']);
        },
        error => {
          console.log('error', error);
          alert('Problem posting data!');
        }
      );
      } catch (ex) {
          console.log('ex', ex);
        } 
       
        this.show = false; 
  }


  rateUser() {
    this.rateclicked = true;
  }
  ngOnInit() {
    this.show = false;
     //getting data from query params
     this.sub = this.route
     .queryParams
     .subscribe(params => {
       // Defaults to 0 if no query param provided.
       this.queryParameters = +params['page'] || 0;
       this.clientemail = params.emailID;
       console.log('email of client: ', this.clientemail);
     });
     
     this.formInitializer();
     this.userservice.getSingleUser(this.clientemail).subscribe(
       userdata => {
         this.dataretrieved = userdata;
         console.log('rating',this.dataretrieved.data.rating);
         this.loaderservice.hideLoader();
 });  
       err => {
         console.log("api error in all request retrieval", err);
         this.loaderservice.hideLoader();
       }
      
   }

   chat(){
     let user = localStorage.getItem('name');
     console.log('useremail sent',user);
     console.log('clientemail sent',this.clientemail);
     const str = user.substring(0, user.indexOf("@"));
      const str1 = this.clientemail.substring(0, this.clientemail.indexOf("@"));
      console.log(' after substring useremail sent',str);
      console.log('after substring clientemail sent',str1);
    this.router.navigate(['/chat'], { queryParams: { useremail: str, clientemail: str1 } });
  
   }

   ratingCalculator() {
    this.calculatedRating = this.dataretrieved.data.rating/this.dataretrieved.data.count;
    this.calculatedRating = parseFloat(this.calculatedRating).toFixed(1);
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
       rating: ['', Validators.required],
       count: ['', Validators.required]
      
     });
   }
 

}
