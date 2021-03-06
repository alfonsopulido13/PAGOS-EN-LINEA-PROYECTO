import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewMapPage } from '../view-map/view-map';
import { ListLocalesPage } from '../list-locales/list-locales';

/**
 * Generated class for the FormaEntregaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forma-entrega',
  templateUrl: 'forma-entrega.html',
})
export class FormaEntregaPage {
  
  public pizzas =  []
  public adicionales = []
  public combos = []

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.pizzas = navParams.get("pizzas");
    this.adicionales = navParams.get("adicionales");
    this.combos = navParams.get("combos");
  }

  ionViewDidLoad() {
    
  }


  domicilio(){
    this.navCtrl.push(ViewMapPage, {
      type: 'cobertura',
      data: {
          NOMBRE: 'Cobertura',
          LATITUD: "-2.134636",
          LONGITUD: "-79.926739"
      },
      pizzas : this.pizzas,
      adicionales : this.adicionales,
      combos : this.combos
    });
  }


  local(){
    this.navCtrl.push(ListLocalesPage, {
      pizzas : this.pizzas,
      adicionales : this.adicionales,
      combos : this.combos
  });
  }

}
