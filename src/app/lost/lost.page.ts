import { Component, OnInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../sdk/custom/user.service';
import { ProjectConfig } from '../sdk/project.config';
import { ToastService } from '../sdk/custom/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { observable } from 'rxjs';

declare var google: any;

@Component({
  selector: 'app-lost',
  templateUrl: './lost.page.html',
  styleUrls: ['./lost.page.scss'],
})
export class LostPage implements OnInit {
  
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  
  editclicked = false;
  sub: any;
  queryParameters: number;
  uniqueID: any;
  markertype;
  sameuser = false;
  loggeduser = localStorage.getItem('name');

  clicked = false;

  dataretrieved;
  imageurl;
  youremail: any;
  emailfromlocalstorage = localStorage.getItem('name');

  
  lat = 30.3753;
  lng = 69.3451;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  map: google.maps.Map;

   //mini map code{end}
  user = {
    src: ''
  };
  address: any;
getData: FormGroup;
  selectedPost: any;
  idOfPostToBeDeleted: any; 

  constructor(private route: ActivatedRoute, private userservice: UserService,
    private router: Router, 
private toastservice: ToastService,
private formbuilder: FormBuilder,
private alertController: AlertController,
    ) { }

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


  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.map.addListener('click', (event) => {
   // this.addMarker(event.latLng);
    });
  }

  update(){
    this.clicked=true;
    if(this.markertype === 'lostperson'){
    try {       
      const getpdata = this.getData.value;
      this.userservice.updateLostPersonPost(getpdata,this.dataretrieved.data._id).subscribe(
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
      if(this.markertype === 'lostproduct'){
        try {       
          const getpdata = this.getData.value;
          this.userservice.updateLostProductPost(getpdata,this.dataretrieved.data._id).subscribe(
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
  edit(){
    this.editclicked = true;
     
  }
  
 //mini map code[end]
 formInitializer() {
  this.getData = this.formbuilder.group({
    description: ['', Validators.required],
    youremail: ['', [Validators.required, Validators.email]],
    reward: ['', Validators.required],
    title: ['', Validators.required],
   
  });
}


async delete() {
  this.selectedPost = this.dataretrieved.data._id;
  console.log('id:',this.selectedPost);
  const alert = await this.alertController.create({
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
if(this.markertype === 'lostperson')
{
  try{
  this.userservice.deleteLostPersonPost(this.selectedPost).subscribe(
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
if(this.markertype === 'lostproduct')
{
  try{
    this.userservice.deleteLostProductPost(this.selectedPost).subscribe(
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

    if (this.markertype === 'lostproduct') {
      //get lost product description
      this.userservice.getSingleLostProduct(this.uniqueID).subscribe(
        alllostproducts => {
          console.log("1st record  products", alllostproducts.data);
          this.dataretrieved = alllostproducts;
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
              this.map.setCenter(latlng);
           //console.log(status);
        });
        this.user.src = ProjectConfig.getPath() + '/' + this.dataretrieved.data.imageUrl;
          console.log('imageurl:', this.user.src);
        },
        err => {
          console.log("api error in all request retrieval", err);
        }
      );
    }//end if
    if (this.markertype === 'lostperson') {
      this.userservice.getSingleLostPerson(this.uniqueID).subscribe(
        alllostproducts => {
          console.log("1st record  products", alllostproducts.data);
          this.dataretrieved = alllostproducts;
          this.user.src = ProjectConfig.getPath() + '/' + this.dataretrieved.data.imageUrl;
              // For conversion of lat lng into address..
          let geocoder = new google.maps.Geocoder;
          let latlng = {lat: this.dataretrieved.data.lat, lng: this.dataretrieved.data.lng};
          geocoder.geocode({'location': latlng}, (results, status) => {
          //console.log(results[0].formatted_address); // read data from here
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
          this.map.setCenter(latlng);
       //console.log(status);
    });

          console.log('imageurl:', this.user.src);
        },
        err => {
          console.log("api error in all request retrieval", err);
        }
      );
    }//end if
  }

}