import { Component } from '@angular/core';
import { NavController , NavParams, LoadingController, ToastController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { CarritoPage } from '../carrito/carrito';
import { FcmProvider } from '../../providers/fcm/fcm';

import { tap } from 'rxjs/operators';
import { CrearPizzaPage } from '../crear-pizza/crear-pizza';
import { TradicionalesPage } from '../tradicionales/tradicionales';
import { FavoritasPage } from '../favoritas/favoritas';
import { ComboPage } from '../combo/combo';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any = {};

  constructor(public navCtrl: NavController, 
              private gplus: GooglePlus, 
              private afAuth: AngularFireAuth ,
              private http: HttpClient, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public fcm : FcmProvider,
              public toastCtrl : ToastController) {
    
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    this.user =  Object.assign({}, this.navParams.data);

  }

  signOut() {
    this.afAuth.auth.signOut();
    this.gplus.logout();
  }

  carrito(){
    this.navCtrl.setRoot(CarritoPage);
  }


  ionViewDidLoad(){
    let firebaseToken = window.localStorage.getItem("firebaseToken");
    console.log("token "+firebaseToken);
  
  }

  ordenarPizza(){
    this.navCtrl.setRoot(CrearPizzaPage);
  }

  tradicionales(){
    this.navCtrl.setRoot(TradicionalesPage);
  }

  favoritas(){
    this.navCtrl.setRoot(FavoritasPage);
  }

  combos(){
    this.navCtrl.setRoot(ComboPage)
  }
  



}
