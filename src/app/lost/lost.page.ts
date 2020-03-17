import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../sdk/custom/user.service';
import { ProjectConfig } from '../sdk/project.config';

declare var google: any;

@Component({
  selector: 'app-lost',
  templateUrl: './lost.page.html',
  styleUrls: ['./lost.page.scss'],
})
export class LostPage implements OnInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  sub: any;
  queryParameters: number;
  uniqueID: any;
  markertype;

  dataretrieved;
  lostproductsData;
  title;
  description;
  imageurl;

  foundproductsData;
  lostpeopleData;
  foundpeopleData;
  youremail: any;
   //                                 mini map code
  lat = 30.3753;
  lng = 69.3451;
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  map: google.maps.Map;
   //                                 mini map code{end}

  user = {
    src: ''
  };


  constructor(private route: ActivatedRoute, private userservice: UserService) { }

  //                                 mini map code
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
 //                                 mini map code[end]

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

    if (this.markertype === 'lostproduct') {
      //get lost product description
      this.userservice.getSingleLostProduct(this.uniqueID).subscribe(
        alllostproducts => {
          console.log("1st record  products", alllostproducts.data);
          this.dataretrieved = alllostproducts;
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
          console.log('imageurl:', this.user.src);
        },
        err => {
          console.log("api error in all request retrieval", err);
        }
      );
    }//end if
  }




}