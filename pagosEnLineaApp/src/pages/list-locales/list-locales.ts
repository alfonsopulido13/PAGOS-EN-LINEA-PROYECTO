import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, AlertController, LoadingController, Loading } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { HomePage } from '../home/home';
import { FormaPagoPage } from '../forma-pago/forma-pago';
/**
 * Generated class for the ListLocalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-locales',
  templateUrl: 'list-locales.html',
})
export class ListLocalesPage {

  locales = [];

  constructor(public navCtrl: NavController
    , public toastCtrl: ToastController
    , public httpRequest: HttpRequestProvider
    , public events: Events
    , public loadingCtrl: LoadingController
    , public alertCtrl: AlertController
    , public navParams: NavParams
  ) {
    this.getLocales();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListLocalesPage');

  }

  getLocales() {
    if (this.locales.length == 0) {
      let loading = this.loadingCtrl.create({
        content: 'Cargando...'
      });
      loading.present()
      var token = window.localStorage.getItem("userToken");
      try {
        console.log(Constantes.getTodosLocales(token))
        this.httpRequest.get(Constantes.getLocales(token)).then((res: any) => {
          res = res.json();
          if (res.STATUS != 'OK') {
            console.log(res);
            loading.dismiss();
            this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
          } else {
            res.PAQUETE.forEach(element => {
              this.locales.push(element);
            });
            // this.locales = res["LOCALES"];
            console.log(this.locales);
            loading.dismiss();
          }
        });
      } catch (err) {
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      }
    }
  }

  seleccionar_direccion(local) {
    let pizzas = this.navParams.get("pizzas");
    let adicionales = this.navParams.get("adicionales");
    let combos = this.navParams.get("combos");
    this.navCtrl.push(FormaPagoPage , {
      pizzas : pizzas,
      adicionales : adicionales,
      combos : combos,
      local : "15"  , //-----------------> coordenadas  lat  , lng
    
      
    }); 
  }

  mostrarMensaje(titulo: string, mensaje: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.navCtrl.setRoot(HomePage)
          }
        }


      ]
    });
    alert.present();

  }

}
