import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider, BipInterface } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

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

  constructor(public navCtrl: NavController, public api: ApiProvider, public storage: Storage) {  
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

  buscarDatos() {
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
console.log(id)
  	this.storage.get('tarjetas')
  	.then((tarjetas) => {
  		for (var el in tarjetas) {
  			if (tarjetas[el].id_hash == id) {
console.log(this.bip_storage)
  				this.bip_storage.splice(parseInt(el), 1);
console.log(this.bip_storage)
  				this.storage.set('tarjetas', this.bip_storage);
  				this.total_tarjetas = this.bip_storage.length;
  			}
 			} 			
  	});
  }

  clearAll() {
  	this.storage.remove('tarjetas')
  		.then((response) => {
  			console.log(response);
  			this.bip_storage = [];
  			this.total_tarjetas = 0;
  		},
  		error => {
  			console.log(error)
  		});
  }
}
