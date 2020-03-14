
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationStrategy } from '@angular/common';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../sdk/custom/user.service';
import {Camera} from '@ionic-native/camera/ngx';
import { File} from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

declare var google:any;

@Component({
  selector: 'app-postlost',
  templateUrl: './postlost.page.html',
  styleUrls: ['./postlost.page.scss'],
})

export class PostlostPage {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

                                            //Variables declared
  latitude: number;
  longitude: number;
  marker: any;
  getLostData: FormGroup;
  userInfo;
  filePresent;
  map: google.maps.Map;
  lat = 30.3753;
  lng = 69.3451;
  private markers =[];
  coordinates = new google.maps.LatLng(this.lat, this.lng);

                                           //Constructor
  constructor(
    private geolocation: Geolocation, 
    private mediaCapture: MediaCapture,
    private alertController: AlertController, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private service: UserService,
    private actionSheetCtrl:ActionSheetController,
    private camera:Camera,
    private fileChooser:FileChooser,
    ){}

    

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
      this.addMarker(event.latLng);
      });
    }

    addInfoWindow(marker, content: string) {
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(this.map, marker);
      })
    }

    addMarker(location) {
       this.clearMarkers();
      if (!location) {
        location = this.map.getCenter();
      }
      
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: location,
        draggable:true,
  
      });
      this.markers.push(marker);

      let content: string = 'remove';
      this.addInfoWindow(marker, content);
      var lat1 = marker.getPosition().lat();
      var lng1 = marker.getPosition().lng();
      console.log(lat1);
      console.log(lng1);

    }

    setMapOnAll(map) {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    }

    clearMarkers() {
      this.setMapOnAll(null);
    }

    async presentActionSheet() {
      let actionSheet =   await this.actionSheetCtrl.create({
        //title: 'Select Image Source',
        buttons: [
          {
            text: 'Load from Library',
            handler:  () => {
              this.fileChooser.open()
              .then(uri => console.log(uri))
              .catch(e => console.log(e));
              //this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          },
          {
            text: 'Use Camera',
            handler: async () => {
              this.takePicture(this.camera.PictureSourceType.CAMERA); 
          }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    }
    public takePicture(sourceType) {
      // Create options for the Camera Dialog
      var options = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };
   
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
    
    SaveProduct(){
      try {
        const getLostData = this.getLostData.value;
        console.log('loginData', getLostData);
        this.service.PostLostProduct(getLostData).subscribe(
          data => {
            alert('successfully posted!')
            console.log('got response from server', data);
            // this.router.navigate(['geolocation']);
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