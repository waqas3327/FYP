
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationStrategy } from '@angular/common';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../sdk/custom/user.service';
import { analyzeAndValidateNgModules, identifierModuleUrl } from '@angular/compiler';


declare var google:any;

@Component({
  selector: 'app-postlost',
  templateUrl: './postlost.page.html',
  styleUrls: ['./postlost.page.scss'],
})
export class PostlostPage {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  latitude: number;
  longitude: number;
  ID: String;
  marker: any;
  getLostData: FormGroup;
  userInfo;
  filePresent;
  isLoadingImgUpload = false;
  isLoading = false;
  
  constructor(
    private geolocation: Geolocation, 
    private mediaCapture: MediaCapture,
    private alertController: AlertController, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private service: UserService
    ){}
    map: google.maps.Map;
    lat = 30.3753;
    lng = 69.3451;

    coordinates = new google.maps.LatLng(this.lat, this.lng);

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

    // marker = new google.maps.Marker({
    //   position: this.coordinates,
    //   map: this.map,
    // });


    ngAfterViewInit() {
      this.mapInitializer();
    }

    mapInitializer() {
      this.map = new google.maps.Map(this.gmap.nativeElement, 
      this.mapOptions);
      //this.marker.setMap(this.map);
    }
    getLocation(){
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.map = new google.maps.Map(this.gmap.nativeElement, 
          this.mapOptions1);
        const infoWindow = new google.maps.InfoWindow;
        const pos = {
          lat: this.latitude,
          lng: this.longitude
        };
        const icon = {
          url: 'https://img.icons8.com/doodle/48/000000/street-view.png', // image url
          scaledSize: new google.maps.Size(50, 50), // scaled size
        };
        const marker = new google.maps.Marker({
             position: pos,
             map: this.map,
             icon: icon
          });
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(this.map);
        this.map.setCenter(pos);
        this.marker.setMap(this.map);
      }).catch((error) => {
        console.log('Error in getting the locations', error);
      });
    }

    onFileChange(e) {
      console.log('e', e);
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
         this.userInfo = {};
         this.userInfo.touched = true;
         this.userInfo.avatar = (<FileReader>event.target).result;
         this.userInfo.file = file;
         this.userInfo.extension = file.name.split('.').pop();
      };
       this.filePresent = true;
    }


    uploadImage() {
      if (this.filePresent) {
        this.isLoadingImgUpload = true;
        //const id = this.getLostData.controls._id;
        this.service
          .uploadAvatar(this.userInfo, this.userInfo.file)
          .subscribe(
            async response => {
              console.log('respoe->', response);
              this.isLoadingImgUpload = false;
              // this.toasterService.pop('success', 'Image uploaded successfully!');
              // // this.appInfoForm.patchValue(response.data);
              // this.slimScroll.complete();
              this.ID = response._id;
              console.log('iddd= ',this.ID);
            },
            error => {
              console.log('error', error);
              this.isLoadingImgUpload = false;
              // this.toasterService.pop(
              //   'error',
              //   'There are some error while uploading Image'
              // );
  
              // this.slimScroll.complete();
            }
          );
      }
    }



    SaveProduct(){
      
      try {
      
        
        const getLostData = this.getLostData.value;
        console.log('lost data', getLostData);
        this.service.PostLostProduct(getLostData,this.ID).subscribe(
          data => {
            alert('successfully posted!')
            console.log('got response from server', data);
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
    savePerson(){
      try {
        const getLostData = this.getLostData.value;
        console.log('loginData', getLostData);
        this.service.PostLostPerson(getLostData).subscribe(
          data => {
            alert('successfully posted!')
            console.log('got response from server', data);
            // this.router.navigate(['geolocation']);
          const id = data._id;
          console.log('id =', id);
          },
          error => {
            console.log('error', error);
            alert('Wrong email or password!');
          }
        );
        } catch (ex) {
            console.log('ex', ex);
          }
    }
    
    SaveToDB() {
     
    var value;
    value = this.getLostData.controls['lostType'].value;
    console.log(value);
    if(value == 'item'){
      this.SaveProduct();
    }
    if(value == 'person'){
      this.savePerson();
    }
  }
    ngOnInit(){
      this.formInitializer();
    }
  
    
  formInitializer() {
    this.getLostData = this.formBuilder.group({
       title: [null, [Validators.required]],
       description: [null, [Validators.required]],
       reward: [null, [Validators.required]],
       lostType: [null, [Validators.required]]
    });
  }
}

