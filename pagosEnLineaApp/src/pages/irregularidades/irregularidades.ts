import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav,InfiniteScroll } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

/**
 * Generated class for the IrregularidadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-irregularidades',
  templateUrl: 'irregularidades.html',
})
export class IrregularidadesPage {

  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams, private irregularidadProvider: ApiServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IrregularidadesPage');
  }


  enviarIrregularidad($event, des, telf, email){
    const irre = {
      descripcion : des,
      telefono : telf,
      correo : email,
    };

    this.enviar(irre);
  }

  async enviar(irre){
    await this.irregularidadProvider.postIrregularidad(irre);
  }

  





}
