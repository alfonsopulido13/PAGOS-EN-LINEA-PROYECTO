import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InicioPage } from '../pages/inicio/inicio';
import { PerfilPage} from '../pages/perfil/perfil';
import { LoginPage } from '../pages/login/login';
import { TradicionalesPage } from '../pages/tradicionales/tradicionales';
import { FavoritasPage } from '../pages/favoritas/favoritas';
import { CrearPizzaPage } from '../pages/crear-pizza/crear-pizza';
import { AdicionalesPage } from '../pages/adicionales/adicionales';
import { HomePage } from '../pages/home/home';
import { TrackingPizzaPage } from '../pages/tracking-pizza/tracking-pizza';
import { CarritoPage } from '../pages/carrito/carrito';
import { ComboPage } from '../pages/combo/combo';
import { ListUbicationPage } from '../pages/list-ubication/list-ubication';
import { ReclamosSugerenciasPage } from '../pages/reclamos-sugerencias/reclamos-sugerencias';
import { ListaPedidosPage } from '../pages/lista-pedidos/lista-pedidos';
import { FcmProvider } from '../providers/fcm/fcm';
import { tap } from 'rxjs/operators';




import { CarritoPPage } from '../pages/carritoP/carritoP';
import { CheckoutPage } from '../pages/checkout/checkout';
import {CarteraTarjetasPage} from '../pages/cartera-tarjetas/cartera-tarjetas';
import { HistorialPage } from '../pages/historial/historial'
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { Storage } from '@ionic/storage';
import { IrregularidadesPage } from '../pages/irregularidades/irregularidades';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
  color: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any ;
  //rootPage:any = LoginPage;


  pages: Array<{title: string, component: any}>;
  appMenuItems: Array<MenuItem>;

  constructor( public platform: Platform, public  menu: MenuController, public  statusBar: StatusBar , public fcm : FcmProvider ,public  toastCtrl : ToastController
    , splashScreen: SplashScreen,  public alertCtrl : AlertController,public storage: Storage) {

      if( window.localStorage.getItem("userToken") != null){
        this.storage.set('userToken', window.localStorage.getItem("userToken"))
        console.log( window.localStorage.getItem("userToken") )
          this.rootPage = HomePage;
      }else{
          this.rootPage = LoginPage;
      }




      this.initializeApp();




      this.appMenuItems = [
        {title: 'Inicio', component: HomePage, icon: 'assets/imgs/inicio.png', color: 'green'},
        {title: 'Perfil', component: PerfilPage, icon: 'assets/imgs/perfil.png', color:'mostaza'},
   //     {title: 'Carrito de Compras', component: CarritoPage, icon: 'cart'},
        {title: 'Ordenar Pizza', component: CrearPizzaPage, icon: 'assets/imgs/orden_pizza.png', color:'secondary_red'},
        {title: 'Pizzas Tradicionales', component: TradicionalesPage, icon: 'assets/imgs/pizza_trad.png', color:'green'},
        {title: 'Combos Promocionales', component: ComboPage, icon: 'assets/imgs/combo.png', color:'mostaza'},
        {title: 'Pizzas Favoritas', component: FavoritasPage, icon: 'assets/imgs/pizza_fav.png', color:'secondary_red'},
        {title: 'Rastrea tus Pedidos', component: ListaPedidosPage, icon: 'assets/imgs/rastreo.png', color:'green'},
        {title: 'Mis Direcciones Favoritas', component: ListUbicationPage, icon: 'assets/imgs/direcciones.png', color:'mostaza' },
        {title: 'Reclamos & Segurencias', component: ReclamosSugerenciasPage, icon: 'assets/imgs/cerrar_sesion.png', color:'green'},
        { title: 'Cartera de Tarjetas', component: CarteraTarjetasPage, icon: '', color:'green'},
        { title: 'Historial de Pagos', component: HistorialPage, icon: '', color:'green'},
        { title: 'Irregularidades', component: IrregularidadesPage, icon: '', color:'green'},
        { title: 'Carrito', component: CarritoPage, icon: '', color:'green'},

      ];

     // window.localStorage.setItem("userToken", "alskmalskdmalskdmasldkmlkm12l3m12lk3m1l3k1mldkmsla");    //Borrar
      window.localStorage.setItem("resumenActivo", "false");

  }

  openPage(page) {
    //Reset the content nav to have just this page
    //we wouldn't want the back button to show in this scenario
    if(page.component) {
      let resumenActivo = window.localStorage.getItem("resumenActivo");
      if(resumenActivo == "true"){
        this.alerta(page)
      }else{
        this.nav.setRoot(page.component);
        this.menu.close();
      }

    } else {
        // logica cerrar sesion
        window.localStorage.clear();
        this.logout();
        this.menu.close();
    }

  }

  logout() {
    window.localStorage.clear();
    this.nav.setRoot(LoginPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();


       // Get a FCM token
       this.fcm.getToken()


       this.fcm.listenToNotifications().pipe(
         tap(msg => {
           console.log(msg)
           const toast = this.toastCtrl.create({
             message: msg.body,
             duration: 3000
           });
           toast.present();
         })
       )
       .subscribe()





      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
     // this.keyboard.disableScroll(true);

    });
  }

  alerta(page) {
    let alert = this.alertCtrl.create({
      title: 'Salir de resumen',
      message: 'Si no añades estos elementos al carrito se perderán, ¿estás seguro que deseas salir? ',
      buttons: [
        {
          text: 'No',
          role: 'cancel',

        },
        {
          text: 'Si',
          handler: () => {
            this.nav.setRoot(page.component);
            this.menu.close();
          }
        }
      ]
    });
    alert.present();
  }
}
