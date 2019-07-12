import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App, Platform, Events } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { DetalleComboPage } from '../detalle-combo/detalle-combo';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { HomePage } from '../home/home';
import { CombinacionesPage } from '../combinaciones/combinaciones';

/**
 * Generated class for the ComboPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-combo',
  templateUrl: 'combo.html',
})
export class ComboPage {

  public combos = [];
  combo1: any;

  public objetivo : string;
  
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public Http: Http
    , public app: App
    , public httpRequest : HttpRequestProvider
    , public loadingCtrl: LoadingController
    , public alertCtrl : AlertController,
      public platform: Platform
    , public events : Events) {

      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot(HomePage)
      },2)
    this.getLocalCombos();
    this.objetivo = navParams.get("objetivo");
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ComboPage');
  }

  getLocalCombos() {
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present()
    var token =  window.localStorage.getItem("userToken");
    try{
      console.log(Constantes.getPromocionalesUrl(token))
      this.httpRequest.get(Constantes.getPromocionalesUrl(token)).then( (res: any) => {
          res = res.json();
          let data = res.COMBOS;
          if(data != null){
            this.combos = Object.keys(data).map(function(index) {
              let promo = data[index];
              return promo;
            });
            console.log(this.combos);
            // this.promociones = res.COMBOS;
            // console.log(this.promociones);
          }else{
            if(data.STATUS != 'OK'){
              this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
            }
          }
          loading.dismiss();
        }, (error : any)=>{
          console.log("Error")
          loading.dismiss();
          this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
        });
    }catch(err) {
      this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
    }
    
  }

  mostrarMensaje(titulo: string ,mensaje: string){
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.app.getRootNavs()[0].setRoot(HomePage)
          }
        }
     
        
      ]
    });
    alert.present();
    
   }

  detalle(combo) {
    this.navCtrl.push(DetalleComboPage, {
      data: combo
    })
  }


  ordenar(combo){
    let comboTemp = {"id":combo.ID ,"nombre" :combo.NOMBRE , "cantidad":1 , "costo":Number(combo.COSTO), "imagenUrl": combo.IMAGEN_URL}
    if(this.objetivo == "nuevo-combo"){
      
      this.events.publish('nuevo-combo', comboTemp  );
      this.navCtrl.pop();
    }else{
      this.navCtrl.setRoot(CombinacionesPage ,{combo: comboTemp})
    }
  }

}
