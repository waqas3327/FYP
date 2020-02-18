
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
declare var google:any;
@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
    map: google.maps.Map;
    lat = 30.3753;
    lng = 69.3451;

    coordinates = new google.maps.LatLng(this.lat, this.lng);

    mapOptions: google.maps.MapOptions = {
     center: this.coordinates,
     zoom: 7
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

}
