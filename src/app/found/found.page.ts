import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectConfig } from '../sdk/project.config';
import { UserService } from '../sdk/custom/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../sdk/custom/toast.service';
import { AlertController } from '@ionic/angular';
import { LoaderService } from '../sdk/custom/loader.service';

declare var google: any;

@Component({
  selector: 'app-found',
  templateUrl: './found.page.html',
  styleUrls: ['./found.page.scss'],
})
export class FoundPage implements OnInit {
 
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  
  getData: FormGroup;
  sub: any;
  queryParameters: number;
  uniqueID: any;
  markertype;

  dataretrieved;
  imageurl;
  youremail: any;

  
  lat = 30.3753;
  lng = 69.3451;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  map: google.maps.Map;

   //mini map code{end}
  user = {
    src: ''
  };
  address: any;
  sameuser = true;
  loggeduser = localStorage.getItem('name');
  clicked = false;
  editclicked = false;
  selectedPost: string;

  constructor(private route: ActivatedRoute, private userservice: UserService,
    private toastservice: ToastService,
    private router: Router,
    private formbuilder: FormBuilder,
    private alertcontroller: AlertController, private loaderservice: LoaderService
    ) { this.loaderservice.showHideAutoLoader();}

  //small map code....
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    disableDefaultUI: true,
    zoom: 15
  };

  mapOptions1: google.maps.MapOptions = {
    center: this.coordinates,
    disableDefaultUI: true,
    zoom: 18
   };

  ngAfterViewInit() {
    this.mapInitializer();
    
  }

  
async delete() {
  this.selectedPost = this.dataretrieved.data._id;
  console.log('id:',this.selectedPost);
  const alert = await this.alertcontroller.create({
    header: 'Confirm!',
    message: 'Are you sure you want to delete the Post?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: blah => {
          console.log('Confirm Cancel: blah');
        }
      },
      {
        text: 'Okay',
        handler: () => {
          this.deletePost();
        }
      }
    ]
  });
  await alert.present();
}
async deletePost() {
if(this.markertype === 'foundperson')
{
  try{
  this.userservice.deleteFoundPersonPost(this.selectedPost).subscribe(
    data => {
      const msg = "Success! Post Deleted Successfully.";
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
if(this.markertype === 'foundproduct')
{
  try{
    this.userservice.deleteFoundProductPost(this.selectedPost).subscribe(
      data => {
        const msg = "Success! Post Deleted Successfully.";
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


  update(){
    this.clicked=true;
    if(this.markertype === 'foundperson'){
    try {       
      const getpdata = this.getData.value;
      this.userservice.updateFoundPersonPost(getpdata,this.dataretrieved.data._id).subscribe(
        data => {
          const msg = "Success! Post Updated Successfully.";
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
      if(this.markertype === 'foundproduct'){
        try {       
          const getpdata = this.getData.value;
          this.userservice.updateFoundProductPost(getpdata,this.dataretrieved.data._id).subscribe(
            data => {
              const msg = "Success! Post Updated Successfully.";
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
  edit(){
    this.editclicked = true;
     
  }
  
 //mini map code[end]
 formInitializer() {
  this.getData = this.formbuilder.group({
    description: ['', Validators.required],
    youremail: ['', [Validators.required, Validators.email]],
    title: ['', Validators.required],
   
  });
}

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.map.addListener('click', (event) => {
   // this.addMarker(event.latLng);
    });
  }
 //mini map code[end]



 viewprofile() {
  this.router.navigate(['/viewclientprofile'], { queryParams: { emailID: this.dataretrieved.data.youremail } });

}

  ngOnInit() {
    this.formInitializer();
    //getting data from query params
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.queryParameters = +params['page'] || 0;
        this.uniqueID = params.markerID;
        this.markertype = params.markertype;
        console.log('ID:', this.uniqueID);
        console.log('markerType: ', this.markertype);
      });

    if (this.markertype === 'foundproduct') {
      //get found product description
      this.userservice.getSingleFoundProduct(this.uniqueID).subscribe(
        alllostproducts => {
          console.log("1st record  products", alllostproducts.data);
          this.dataretrieved = alllostproducts;
          this.user.src = ProjectConfig.getPath() + '/' + this.dataretrieved.data.imageUrl;
          console.log('imageurl:', this.user.src);
       // For conversion of lat lng into address..
       let geocoder = new google.maps.Geocoder;
       let latlng = {lat: this.dataretrieved.data.lat, lng: this.dataretrieved.data.lng};
       geocoder.geocode({'location': latlng}, (results, status) => {
       console.log(results[0].formatted_address); // read data from here
       this.address = results[0].formatted_address;

       //for placing marker
       let marker = new google.maps.Marker({
         map: this.map,
         animation: google.maps.Animation.DROP,
         position:latlng ,
       });
       if(this.dataretrieved.data.youremail == this.loggeduser){
        this.sameuser = true;
      }
      else{
        this.sameuser = false;
        }
       this.map.setCenter(latlng);
    //console.log(status);
 });

          
        },
        err => {
          console.log("api error in all request retrieval", err);
        }
      );
    }//end if
    if (this.markertype === 'foundperson') {
      this.userservice.getSingleFoundPerson(this.uniqueID).subscribe(
        alllostproducts => {
          console.log("1st record  products", alllostproducts.data);
          this.dataretrieved = alllostproducts;
          this.user.src = ProjectConfig.getPath() + '/' + this.dataretrieved.data.imageUrl;
          console.log('imageurl:', this.user.src);
                 // For conversion of lat lng into address..
                 let geocoder = new google.maps.Geocoder;
                 let latlng = {lat: this.dataretrieved.data.lat, lng: this.dataretrieved.data.lng};
                 geocoder.geocode({'location': latlng}, (results, status) => {
                 console.log(results[0].formatted_address); // read data from here
                 this.address = results[0].formatted_address;
       
                 //for placing marker
                 let marker = new google.maps.Marker({
                   map: this.map,
                   animation: google.maps.Animation.DROP,
                   position:latlng ,
                 });
                 if(this.dataretrieved.data.youremail == this.loggeduser){
                  this.sameuser = true;
                }
                else{
                  this.sameuser = false;
                  }
                 this.map.setCenter(latlng);
              //console.log(status);
           });
        },
        err => {
          console.log("api error in all request retrieval", err);
        }
      );
    }//end if
  }
}