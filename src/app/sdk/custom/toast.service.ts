
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastcontroller:ToastController) { }

  //toast
  async presentToast(msg) {
    const toast = await this.toastcontroller.create({
    message: msg,
    duration: 2000
   });
    toast.present();
  }

  async presentToastWithOptions(msg) {
    const toast = await this.toastcontroller.create({
      header: 'Toast header',
      message: msg,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
