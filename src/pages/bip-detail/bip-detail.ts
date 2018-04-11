import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider, BipInterface } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Md5 } from 'ts-md5/dist/md5';

/**
 * Generated class for the BipDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bip-detail',
  templateUrl: 'bip-detail.html',
})
export class BipDetailPage {
	public bip: number;
	public item: BipInterface;
	public bip_response: BipInterface = {
		estadoContrato: '',
		fechaSaldo: '',
		id: null,
		saldoTarjeta: '',
		fecha_consulta: '',
		id_hash: null
	};
	public bip_storage: BipInterface[] = [];

  constructor(
  	public navCtrl: NavController
  	, public navParams: NavParams
  	, public api: ApiProvider
  	, public storage: Storage
  	, private splashScreen: SplashScreen
  	) {

  	this.item = navParams.get('item') || {};
  	this.bip = navParams.get('bip') || 0;
  	
  	this.storage.get('tarjetas')
		.then((tarjetas) => {
			if (tarjetas != null) {
				this.bip_storage = tarjetas;					
			} 

			if (this.bip != 0) {
	  		this.getDatos();
	  	} else if (typeof this.item.id != 'undefined') {
	  		 this.bip = this.item.id;
	  		 this.getDatos();
	  	}
		});  	
  }

  ionViewDidLoad() {
    this.splashScreen.show();
  }

  getDatos() {
  	this.api.getSaldo(this.bip)
  		.subscribe(
  			data => {
  				let fecha_consulta = new Date();
					let options = {
					    hour: "numeric", minute: "numeric"
					}


  				this.splashScreen.hide();
  				this.bip_response = <BipInterface> data;
  				this.bip_response.fecha_consulta = fecha_consulta.toLocaleDateString("en-EU", options);
  				this.bip_response.id_hash = this.bip_storage.length;
  				this.item = this.bip_response;
  				this.bip_storage.push(this.bip_response);
  				this.storage.set('tarjetas', this.bip_storage)
  					.then(
  						response => console.log(response),
  						error => console.log(error)
  						)
  			},
  			error => {
  				console.log(error)
  				this.navCtrl.pop();
  			}
			)
  }

  deleteItem(id) {
  	this.storage.get('tarjetas')
  	.then((tarjetas) => {
  		for (var el in tarjetas) {
  			if (tarjetas[el].id == id) {
  				this.bip_storage.splice(parseInt(el), 1);
  				this.storage.set('tarjetas', this.bip_storage);
  				this.navCtrl.pop();
  			}
 			} 			
  	});
  }
}
