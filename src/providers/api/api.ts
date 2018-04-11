import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  getSaldo(bip: number) {
  	return this.http.get('http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip='+bip);
  }
}

export interface BipInterface {
	estadoContrato: string,
	fechaSaldo: string,
	id: number,
	saldoTarjeta: string,
	fecha_consulta: string,
	id_hash: number
}
