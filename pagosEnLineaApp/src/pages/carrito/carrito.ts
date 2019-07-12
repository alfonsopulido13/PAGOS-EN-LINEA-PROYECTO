import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, FabContainer, ToastController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { Combinacion } from '../../interfaces/ICombinacion';
import { Pizza } from '../../interfaces/IPizza';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { HomePage } from '../home/home';
import { c } from '@angular/core/src/render3';
import { FormaEntregaPage } from '../forma-entrega/forma-entrega';




@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  public pizzas =  []
  public adicionales = []
  public combos = []

  public cargando = false;

  public costoTotal : Number;

  constructor(public navCtrl: NavController
            , public navParams: NavParams 
            , public toastCtrl: ToastController
            , public httpRequest : HttpRequestProvider
            , public events: Events
            , public loadingCtrl: LoadingController
            , public alertCtrl : AlertController ,
              public platform: Platform) {

              platform.registerBackButtonAction(() => {
                this.navCtrl.setRoot(HomePage)
              },2)

          this.cargarCarrito()
  }


  ionViewDidLoad() {
    
  }

   /**
   * Este metodo disminuye la cantidad del elemento recibido 
   */
  disminuirCantidad(elemento) {
    elemento.cantidad = Number(elemento.cantidad)- 1;
    this.actualizarPrecioTotal();
  }
  /**
   * Este metodo aumenta la cantidad del elemento recibido 
   */
  aumentarCantidad(elemento) {
    elemento.cantidad = Number(elemento.cantidad)+1;
    this.actualizarPrecioTotal();
  }


  cargarCarrito(){
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    this.cargando = true;
    try{
      let token = window.localStorage.getItem("userToken");
      this.httpRequest.get(Constantes.getCarritoUrl(token)).then((data : any) => {
        
        var response = data.json();
        console.log(response)
        if(response["STATUS"] != undefined  ||  response["STATUS"] != "OK" ){
          let carrito = response.CARRITO;
          carrito.PIZZAS.forEach((pizza :any) => {
            let composicion = {"id" : pizza.ID,"nombre": pizza.NOMBRE , "tamano":pizza.TAMANO , "cantidad" : Number(pizza.CANTIDAD) , "tipo" : pizza.TIPO, "costo": Number(pizza.COSTO) , "masa": pizza.MASA , "borde":pizza.BORDE };
            let ingredientes = [];
            pizza.INGREDIENTES.forEach(ingrediente => {
              console.log(ingrediente)
              ingredientes.push(ingrediente)
            });
            composicion["ingredientes"] = ingredientes;
            this.pizzas.push(composicion);
            
          });

          carrito.ADICIONALES.forEach((adicional :any) => {
            this.adicionales.push({"id": adicional.ID , "nombre": adicional.NOMBRE , "costo": Number(adicional.COSTO) , "cantidad" : Number(adicional.CANTIDAD) , "imagenUrl":adicional.IMAGEN_URL , "tipo": adicional.TIPO});
          });
          carrito.COMBOS.forEach((combo :any) => {
            this.combos.push({"id": combo.ID , "nombre": combo.NOMBRE , "costo": Number(combo.COSTO) , "cantidad" : Number(combo.CANTIDAD) , "imagenUrl":combo.IMAGEN_URL , "tipo": combo.TIPO});
          });
          
          this.actualizarPrecioTotal();
          this.cargando = false;
          loading.dismiss();
        }else{
          this.cargando = false;
          loading.dismiss();

          this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
        }
        
      }, (err)=>{
        this.cargando = false;
        loading.dismiss();
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      });
    }
    catch(err) {
      this.cargando = false;
      loading.dismiss();
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
            this.navCtrl.setRoot(HomePage)
          }
        }
     
        
      ]
    });
    alert.present();
    
   }


  



   actualizarPrecioTotal(){

    let totalPizzas = 0;
    let totalAdicionales = 0 ;
    let totalCombos = 0;
    //Calular total de pizzas 
    if(this.pizzas.length > 0){
      this.pizzas.forEach( pizza => {
    
      
        totalPizzas += Number(pizza.costo)  * Number(pizza.cantidad);
      });
    }
    //Calcular total de adicionales
    if(this.adicionales.length > 0){
      
       this.adicionales.forEach( (adicional) => {
          totalAdicionales += Number(adicional.costo)  * Number(adicional.cantidad)
      });  
    }
    //Calcular total de combos
    if(this.combos.length > 0){
      
      this.combos.forEach( (combo) => {
         totalCombos += Number(combo.costo)  * Number(combo.cantidad)
     });  
   }
    
   
    //suma de todos los productos
    this.costoTotal = totalPizzas + totalAdicionales + totalCombos ;
    

 }

 

 ordenar(){
  this.navCtrl.push(FormaEntregaPage, {
    pizzas : this.pizzas,
    adicionales : this.adicionales,
    combos : this.combos
  });
  
  
  
}




   /**
  * Este metodo elimina un elemento del resumen
  * @param elemento 
  */
borrarElementoServidor(elemento, tipo){
  let loading = this.loadingCtrl .create({
    content: 'Cargando...'
  });
  let token = window.localStorage.getItem("userToken");
  let cuerpo = {"TOKEN":token , "ID": elemento.id, "TIPO": tipo}
  try{
          
    this.httpRequest.post(Constantes.BORRAR_ELEMENTO_CARRITO , cuerpo).then((data : any) => {
      var response = data.json();
      if(response["STATUS"] == "OK"){
     
        if(tipo == "PIZZA"){
          let index = this.pizzas.map(function (x) { return x.id; }).indexOf(elemento.id);
          this.pizzas.splice(index,1 );
        }else if( tipo == "ADICIONAL"){
          let index = this.adicionales.map(function (x) { return x.id; }).indexOf(elemento.id);
          this.adicionales.splice(index,1 );
        }else if( tipo == "COMBO"){
          let index = this.combos.map(function (x) { return x.id; }).indexOf(elemento.id);
          this.combos.splice(index,1 );
        }
        
        this.actualizarPrecioTotal();
      }
      loading.dismiss();

      
    }, (err)=>{
      this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
    });
  }
  catch(err) {
    loading.dismiss();
    this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
  }
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


  eliminarElemento(elemento,tipo) {
    let alert = this.alertCtrl.create({
      title: 'Borrar elemento',
      message: '¿Estás seguro que deseas borrar este elemento del carrito? ',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
       
        },
        {
          text: 'Si',
          handler: () => {
            this.borrarElementoServidor(elemento,tipo)
          }
        }
      ]
    });
    alert.present();
  }
  
}
