import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageProvider {
	conf: Object = {
    duration: 3000,
    position: 'bottom',
    message: ''
  };

  constructor(private toast: ToastController) {
    console.log('Hello MessageProvider Provider');
  }

  print(message: string) {
  	this.conf['message'] = message;
  	let toast = this.toast.create(this.conf);
    toast.present();
  }
}
