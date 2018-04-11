import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BipDetailPage } from './bip-detail';

@NgModule({
  declarations: [
    BipDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BipDetailPage),
  ],
})
export class BipDetailPageModule {}
