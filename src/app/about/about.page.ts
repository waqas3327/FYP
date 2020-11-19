import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
// tslint:disable-next-line: prefer-const
constructor(private platform: Platform, private router: Router) {
  this.platform.backButton.subscribeWithPriority(10, () => {
    console.log('Handler was called!',this.router.url);
    this.router.navigate(['geolocation']);
  });
}

ngOnInit() {
  
  }

}
