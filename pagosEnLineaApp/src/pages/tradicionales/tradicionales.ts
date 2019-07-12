import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { VirtualScroll } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { Pizza } from "../../interfaces/IPizza";
import { CombinacionesPage } from '../combinaciones/combinaciones';


/**
 * Generated class for the TradicionalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tradicionales',
  templateUrl: 'tradicionales.html',
})
@ViewChild('virtualScroll', { read: VirtualScroll })
export class TradicionalesPage {

  public objetivo : string;
  public pizzas:Array<Pizza> = new Array<Pizza>();

  public virtualScroll: VirtualScroll;

  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public httpRequest: HttpRequestProvider
              , public loadingCtrl: LoadingController
              , private toastCtrl: ToastController
              , public events : Events) {
     this.obtenerPizzas();
     this.objetivo = navParams.get("objetivo");
  }

  obtenerPizzas(){
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    if(window.localStorage.getItem("userToken") != null){
      console.log(Constantes.getTradicionalesUrl(window.localStorage.getItem("userToken")))
      this.httpRequest.get(Constantes.getTradicionalesUrl(window.localStorage.getItem("userToken"))).then((data:any) => {
        var response = data.json();
        console.log(response);  
        if(response.STATUS == "OK"){
          for (var key in response.PIZZAS) {
            var child = response.PIZZAS[key];
            let pizza:Pizza = {
              id: child.ID,
              nombre : child.NOMBRE,
              descripcion : child.DESCRIPCION,
              imgUrl : child.IMAGEN_URL,
              favorita: child.FAVORITA,
              masa : null,
              borde : null,
              ingredientes : null,
              tamano : child.TAMANO,
              cantidad : 1,
              costo : child.COSTO
            }
            console.log(pizza);
            this.pizzas.push(pizza);
          }
        } 
        loading.dismiss();             
      },(error : any)=>{
        console.log("Error");
        loading.dismiss();
      });
    }
    
  }

  favorito(event){
    var id = event.id
    
    var datos = {"PIZZA_ID": Number(id), "TOKEN": window.localStorage.getItem("userToken")};
    console.log(datos);
    var service;
    for(let pizza of this.pizzas){
      if(pizza.id == id){
        if(pizza.favorita == "1"){
          pizza.favorita = "0";
          service = "http://navi.pythonanywhere.com/rest/borrar_pizza_favorita";
        }else{
          pizza.favorita = "1";
          service = Constantes.getCrearPizzaFavoritasUrl();
        }
      } 
    }

    this.httpRequest.post(service, datos).then((data:any)=>{
      var response = data.json();
      console.log(response);
      if (response.STATUS == "ERROR"){
        this.presentToast(response.DETALLE);
      };      
    });
  }

  presentToast(mensaje: string , duracion? : Number, posicion? : string , mostrarBoton? : boolean , mensajeBoton? :string )  {
    let duration ,position , closeButtonText, showCloseButton;
    if(duracion == undefined){
        duration = 3000;
    }
    if(mostrarBoton == undefined){
      showCloseButton = false;
    }
    if(mensajeBoton == undefined){
      mensajeBoton = "";
    }
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: duration,
      position: position,
      cssClass: 'dark-trans',
      closeButtonText: closeButtonText,
      showCloseButton: showCloseButton
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TradicionalesPage');
  }

  ordenar(pizza){
    if(this.objetivo == "nueva-tradicional"){
      this.events.publish('nueva-tradicional', pizza );
      this.navCtrl.pop();
    }else{
      this.navCtrl.setRoot(CombinacionesPage ,{tradicional: pizza})
    }
  }


  
  

}
