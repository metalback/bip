import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider, BipInterface } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { MessageProvider } from '../../providers/message/message';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public bip: number;
	public bip_response: BipInterface = {
		estadoContrato: '',
		fechaSaldo: '',
		id: null,
		saldoTarjeta: '',
		fecha_consulta: '',
		id_hash: null
	};
	public bip_storage: BipInterface[] = [];
	public mensaje_sistema: string;
	public total_tarjetas: number = 0;

  constructor(
  	public navCtrl: NavController
  	, public navParams: NavParams
  	, public api: ApiProvider
  	, public storage: Storage
  	, private messenger: MessageProvider
  ) {  
  	this.storage.get('tarjetas')
  		.then( data => console.log(data) );	

  	this.storage.get('tarjetas')
  		.then((tarjetas) => {
  			if (tarjetas != null) {
  				this.bip_storage = tarjetas;
  				this.total_tarjetas = this.bip_storage.length;
  			}  			
  		});
  }

  ionViewDidEnter() {
  	this.storage.get('tarjetas')
  	.then((tarjetas) => {
  		if (tarjetas != null) {
  			this.bip_storage = tarjetas;
  			this.total_tarjetas = this.bip_storage.length;
  		}  			
  	});
  }

  ionViewWillLeave() {
  	console.log('Saliendooooo');
  	this.bip = null;
  }

  buscarDatos() {
  	if (typeof this.bip != 'string') {
  		this.bip = null;
  		this.messenger.print('Debe ingresar un número válido');
  		return false;
  	}

  	this.navCtrl.push('BipDetailPage', {
			bip: this.bip
		});
  }

  openItem(item) {
		this.navCtrl.push('BipDetailPage', {
			item: item
		});
  }

  deleteItem(id) {
  	this.storage.get('tarjetas')
  	.then((tarjetas) => {
  		for (var el in tarjetas) {
  			if (tarjetas[el].id_hash == id) {
  				this.bip_storage.splice(parseInt(el), 1);
  				this.storage.set('tarjetas', this.bip_storage);
  				this.total_tarjetas = this.bip_storage.length;
  			}
 			} 			
  	});
  }

  clearAll() {
  	this.storage.remove('tarjetas')
  		.then((response) => {
  			this.bip_storage = [];
  			this.total_tarjetas = 0;
  		},
  		error => {
  			console.log(error)
  		});
  }
}
