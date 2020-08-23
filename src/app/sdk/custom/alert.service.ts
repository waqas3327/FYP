import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService{

  constructor(private alertController: AlertController) { }

  async presentAlertConfirm(message,header) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
        text: 'Okay',
        role: 'exit',
        cssClass: 'secondary',
        handler: (blah) => { }
      },{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => { }
      }
    ]
    });
    await alert.present();
      }
}
