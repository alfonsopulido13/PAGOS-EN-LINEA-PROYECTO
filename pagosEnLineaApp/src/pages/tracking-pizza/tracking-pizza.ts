import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TrackingPizzaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tracking-pizza',
  templateUrl: 'tracking-pizza.html',
})
export class TrackingPizzaPage {
  
 
  estados  = [{"nombre":"Preparando", "descripcion":"Tu pizza ya esta siendo preparada", "hora":"10:30 " },
               {"nombre":"En el horno", "descripcion":"Tu pizza ya se encuentra en el horno" , "hora":"10:45"},
               {"nombre":"En el horno", "descripcion":"Tu pizza ya se encuentra en el horno" , "hora":"10:45"},
               {"nombre":"En camino", "descripcion":"Tu pedido ya ha salido del local" , "hora": "11:10"}]
  constructor(public navCtrl: NavController
            , public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingPizzaPage');
  }

}
