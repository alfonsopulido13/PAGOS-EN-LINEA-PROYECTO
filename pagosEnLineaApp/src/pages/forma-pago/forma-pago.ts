import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, LoadingController, AlertController, Platform } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { ListaPedidosPage } from '../lista-pedidos/lista-pedidos';
import { ValoresPage  } from '../valores/valores';

/**
 * Generated class for the FormaPagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forma-pago',
  templateUrl: 'forma-pago.html',
})
export class FormaPagoPage {


  constructor(public navCtrl: NavController
            , public navParams: NavParams 
            , public toastCtrl: ToastController
            , public httpRequest : HttpRequestProvider
            , public events: Events
            , public loadingCtrl: LoadingController
            , public alertCtrl : AlertController ,
              public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormaPagoPage');
  }


  efectivo(){
    let pizzas = this.navParams.get("pizzas");
    let adicionales = this.navParams.get("adicionales");
    let combos = this.navParams.get("combos");

    let coordenada = this.navParams.get("coordenada");
    let poligono = this.navParams.get("poligono");
    let local = this.navParams.get("local");

    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    let token = window.localStorage.getItem("userToken");
    let tokenFirebase = window.localStorage.getItem("firebaseToken");
    
    let elementos = []
    pizzas.forEach(elemento=> {
      elementos.push({"ID":elemento.id , "CANTIDAD":elemento.cantidad , "TIPO":elemento.tipo})
    });
    adicionales.forEach(elemento=> {
      elementos.push({"ID":elemento.id , "CANTIDAD":elemento.cantidad , "TIPO":elemento.tipo})
    });
    combos.forEach(elemento=> {
      elementos.push({"ID":elemento.id , "CANTIDAD":elemento.cantidad , "TIPO":elemento.tipo})
    });
    let pedido = {};
   
    if(local == null){
      pedido = {"TOKEN": token  , "TOKEN_FIREBASE": tokenFirebase , "FORMA_PAGO" : "1" , "ELEMENTOS":elementos
      , "DIRECCION":{"LATITUD": coordenada.lat , "LONGITUD":coordenada.lng} , "POLIGONO_ID": poligono }
    }else{
      pedido = {"TOKEN": token  , "TOKEN_FIREBASE": tokenFirebase , "FORMA_PAGO" : "1" , "ELEMENTOS":elementos
      , "POLIGONO_ID": poligono}
    }
    console.log(pedido);
    this.httpRequest.post(Constantes.CREAR_PEDIDOS, pedido).then((data : any)=>{
      var response = data.json();
      console.log(response)
      if(response["STATUS"] == 'OK'){
        this.mostrarMensaje("Pedido enviado","Tu pedido ha sido recibido exitosamente, ahora puedes revisar el estado de tu pedido", "OK");

        loading.dismiss();
      }else{
        loading.dismiss();
        this.mostrarMensaje("","Estamos teniendo inconvenientes, por favor intenta nuevamente", "ERROR");
      }
    }, (err)=>{
      loading.dismiss();
      this.mostrarMensaje("","Estamos teniendo inconvenientes, por favor intenta nuevamente","ERROR");
    });
  
    
  }



  tarjeta(){
    this.navCtrl.setRoot(ValoresPage);

  }



  mostrarMensaje(titulo: string ,mensaje: string , objetivo: string){
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            if(objetivo == "OK"){
              this.navCtrl.setRoot(ListaPedidosPage);
            }
            
          }
        }
     
        
      ]
    });
    alert.present();
    
   }


}
