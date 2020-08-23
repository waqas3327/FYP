import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
// tslint:disable-next-line: prefer-const
@ViewChild(IonRouterOutlet, { static: false }) routerOutlets: IonRouterOutlet;

constructor() { this.backbutton(); }
backbutton() {
    console.log('backbutton');
    document.addEventListener('backbutton', () => {
      console.log('backbutton1');
      if (this.routerOutlets && this.routerOutlets.canGoBack()) {
        this.routerOutlets.pop();
      }
});
}
ngOnInit() {
  }

}
