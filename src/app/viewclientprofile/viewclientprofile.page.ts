import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../sdk/custom/user.service';
import { ToastService } from '../sdk/custom/toast.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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

  constructor(private route: ActivatedRoute,private userservice: UserService,
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
 });  
       err => {
         console.log("api error in all request retrieval", err);
       }
   }
 
   formInitializer() {
     this.getProfileData = this.formBuilder.group({
       name: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]],
       mnumber: ['', Validators.required],
       address: ['', Validators.required],
      
     });
   }
 

}
