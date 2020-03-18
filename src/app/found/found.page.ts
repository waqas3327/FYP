import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectConfig } from '../sdk/project.config';
import { UserService } from '../sdk/custom/user.service';

declare var google: any;

@Component({
  selector: 'app-found',
  templateUrl: './found.page.html',
  styleUrls: ['./found.page.scss'],
})
export class FoundPage implements OnInit {
 
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  
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

  constructor(private route: ActivatedRoute, private userservice: UserService) { }

  //small map code....
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    disableDefaultUI: true,
    zoom: 7
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
 //mini map code[end]

  ngOnInit() {
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