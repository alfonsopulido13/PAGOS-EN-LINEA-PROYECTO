import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, FabContainer, AlertController, App, Platform, LoadingController } from 'ionic-angular';
import { Adicional } from '../../interfaces/IAdicional';
import { Combinacion } from '../../interfaces/ICombinacion';
import { CrearPizzaPage } from '../crear-pizza/crear-pizza';
import { Pizza } from '../../interfaces/IPizza';
import { AdicionalesPage } from '../adicionales/adicionales';
import { FavoritasPage } from '../favoritas/favoritas';
import { TradicionalesPage } from '../tradicionales/tradicionales';
import { CarritoPage } from '../carrito/carrito';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { HomePage } from '../home/home';
import { l } from '@angular/core/src/render3';
import { ComboPage } from '../combo/combo';

/**
 * Generated class for the CombinacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-combinaciones',
  templateUrl: 'combinaciones.html',
})
export class CombinacionesPage {

  public combinacion : Combinacion

  
  public tradicionales : Array<Pizza>;
  public combos = []

  costoTotal : Number;
  bloquearBoton = false;
  constructor(public navCtrl: NavController
            , public navParams: NavParams 
            ,public events : Events
            , public httpRequest: HttpRequestProvider
            , public alertCtrl : AlertController
            , public app : App,
              public platform: Platform
            , public loadingCtrl : LoadingController) {

              platform.registerBackButtonAction(() => {
                this.navCtrl.setRoot(HomePage)
              },2)
          this.tradicionales  = new Array<Pizza>();
          this.combos = [];
          //instanciar combinacion
          let combinacion : Combinacion={
              pizzas : [],
              adicionales :[],
              total : 0
          }
          this.combinacion = combinacion;
          //leyendo parametros recibidos
          let pizza =  navParams.get("pizza");
          let adicionales =  navParams.get("adicionales")
          let tradicional =  navParams.get("tradicional")
          let combo =  navParams.get("combo")
          
          if( pizza != null ){
             this.combinacion.pizzas.push(pizza);
          }
          if( tradicional != null ){
            this.tradicionales.push(tradicional);
         }
         if( combo != null ){
          this.combos.push(combo);
         }
          if( adicionales != null ){
              adicionales.forEach(adicional => {
                this.combinacion.adicionales.push(adicional)
              });
 
          }
          this.actualizarPrecioTotal();
          window.localStorage.setItem("resumenActivo", "true");
  }

  


  ionViewDidLoad() {
    this.escucharEventos();
    
  }

   /**
   * Este pone el resumen en escucha de nuevos elementos  
   */
  escucharEventos(){
    //Escuchar evento de creacion  de pizza
    this.events.subscribe('nueva-pizza', pizza => {
        this.combinacion.pizzas.push(pizza)
        this.actualizarPrecioTotal();
    });
    //Escuchar evento de creacion  de pizza
    this.events.subscribe('nueva-favorita', pizza => {
      if(this.combinacion.pizzas.filter(function(e ,index) { return e.id === pizza.id ; }).length > 0){
        let index = this.combinacion.pizzas.map(function (x) { return x.id; }).indexOf(pizza.id);
        this.combinacion.pizzas[index].cantidad += pizza.cantidad; 
      }else{
        //Si no existe se agrega
        this.combinacion.pizzas.push(pizza);
      }
      
      this.actualizarPrecioTotal();
    });
    //Escuchar evento de seleccion de pizza tradicional
    this.events.subscribe('nueva-tradicional', pizza => {
      //Si la pizza ya existe solo se aumenta su cantidad
      if(this.tradicionales.filter(function(e ,index) { return e.id === pizza.id ; }).length > 0){
        let index = this.tradicionales.map(function (x) { return x.id; }).indexOf(pizza.id);
        this.tradicionales[index].cantidad += pizza.cantidad; 
      }else{
        //Si no existe se agrega
        this.tradicionales.push(pizza)
      }
      
      this.actualizarPrecioTotal();
    });

    //Escuchar evento de seleccion de nuevo combo
    this.events.subscribe('nuevo-combo', combo => {
      //Si el combo ya existe solo se aumenta su cantidad
      if(this.combos.filter(function(e ,index) { return e.id === combo.id ; }).length > 0){
        let index = this.combos.map(function (x) { return x.id; }).indexOf(combo.id);
        this.combos[index].cantidad += combo.cantidad; 
      }else{
        //Si no existe se agrega
        this.combos.push(combo)
      }
      
      this.actualizarPrecioTotal();
    });
    //Escuchar evento de seleccion de nuevo adicional
    this.events.subscribe('nuevo-adicional', adicionales => {
      
      adicionales.forEach(adicional => {
        //Si el adicional ya existe solo se aumenta su cantidad
        if(this.combinacion.adicionales.filter(function(e ,index) { return e.id === adicional.id ; }).length > 0){
            let index = this.combinacion.adicionales.map(function (x) { return x.id; }).indexOf(adicional.id);
            this.combinacion.adicionales[index].cantidad += adicional.cantidad; 
        }else{
          //Si no existe se agrega
          this.combinacion.adicionales.push(adicional);
        }
          
      });
      this.actualizarPrecioTotal();
    });
    //Escuchar evento para acutalizar una pizza cuando ha sido editada
    this.events.subscribe('editar-pizza', pizza => {
      let index = this.combinacion.pizzas.map(function (x) { return x.id; }).indexOf(pizza.id);
      this.combinacion.pizzas[index] = pizza;
      this.actualizarPrecioTotal();
    });

    
 
   
      
  }

  /**
   * Este metodo elimina todas las suscripciones de eventos
   */
  ngOnDestroy(){
    this.events.unsubscribe('nueva-pizza');
    this.events.unsubscribe('nueva-tradicional');
    this.events.unsubscribe('nuevo-adicional');
    this.events.unsubscribe('editar-pizza');
    this.events.unsubscribe('nueva-favorita');
    this.events.unsubscribe('nuevo-combo');
    window.localStorage.setItem("resumenActivo", "false");
  }

  /**
   * Este metodo abre la pagina crearPizza, con el objetivo de crear una nueva pizza al resumen
   */
  anadirPizza(fab: FabContainer){
    fab.close();
    this.navCtrl.push(CrearPizzaPage , {
      objetivo : "nueva-pizza"
    
    });
  }
   /**
   * Este metodo abre la pagina de favoritas, con el objetivo de anadir una nueva pizza al resumen
   */
  anadirPizzaFav(fab: FabContainer){
    fab.close();
    this.navCtrl.push(FavoritasPage , {
      objetivo : "nueva-favorita"
    
    });
  }
   /**
   * Este metodo abre la pagina de tradicionales, con el objetivo de anadir una nueva pizza al resumen
   */
  anadirPizzaTradicional(fab: FabContainer){
    fab.close();
    this.navCtrl.push(TradicionalesPage , {
      objetivo : "nueva-tradicional"
    
    });
  }
   /**
   * Este metodo abre la pagina de adicionales, con el objetivo de anadir un nuevo adicional al resumen
   */
  anadirAdicional(fab: FabContainer){
    fab.close();
    this.navCtrl.push(AdicionalesPage , {
      objetivo : "nuevo-adicional"
    
    });
    
  }

  /**
   * Este metodo abre la pagina de combos, con el objetivo de anadir un nuevo combo al resumen
   */
  anadirCombo(fab: FabContainer){
    fab.close();
    this.navCtrl.push(ComboPage , {
      objetivo : "nuevo-combo"
    
    });
    
  }

   /**
   * Este metodo disminuye la cantidad del elemento recibido 
   */
  disminuirCantidad(elemento) {
    
    elemento.cantidad--;
    this.actualizarPrecioTotal();
  }
  /**
   * Este metodo aumenta la cantidad del elemento recibido 
   */
  aumentarCantidad(elemento) {
    elemento.cantidad++;
    this.actualizarPrecioTotal();
  }


  /**
   * Este metodo suma los costos de los elementos de la combinacion
   */
  actualizarPrecioTotal(){
    let totalPizzas = 0;
    let totalAdicionales = 0 ;
    let totalTradicionales = 0 ;
    let totalCombos = 0 ;
    //Calular total de pizzas creadas
    if(this.combinacion.pizzas.length > 0){
      this.combinacion.pizzas.forEach( pizza => {
         let totalPizza = 0;
        if(pizza.masa !=null){
          totalPizza += Number(pizza.masa.costo);
        }
        if(pizza.borde !=null){
         totalPizza += Number(pizza.borde.costo);
       }
       if(pizza.ingredientes.length >0){
         pizza.ingredientes.forEach(function (ingrediente) {
               totalPizza += Number(ingrediente.costoBase) * Number(ingrediente.porcion.valor);                  
         });
       }
       pizza.costo = totalPizza
       totalPizzas += totalPizza * Number(pizza.cantidad);
      });
    }
    //Calcular total de adicionales
    if(this.combinacion.adicionales.length > 0){
     
       this.combinacion.adicionales.forEach( (adicional : Adicional) => {
      
          totalAdicionales += Number(adicional.costoBase) * Number(adicional.cantidad )
      });  
    }
     //Calcular total de tradicionales
     if(this.tradicionales.length > 0){
      this.tradicionales.forEach( (tradicional : Pizza) => {
     
         totalTradicionales += Number(tradicional.costo) * Number(tradicional.cantidad )
      });  

    }
     //Calcular total de combos
     if(this.combos.length > 0){
      this.combos.forEach( (combo) => {
     
         totalCombos += Number(combo.costo) * Number(combo.cantidad )
      });  
    }
    //suma de todos los productos
    this.costoTotal = totalPizzas + totalAdicionales + totalTradicionales + totalCombos;
    

 }

 /**
  * Este metodo elimina un adicional del resumen
  * @param adicional 
  */
 eliminarAdicional(adicional){
    let index = this.combinacion.adicionales.map(function (x) { return x.id; }).indexOf(adicional.id);
    this.combinacion.adicionales.splice(index,1 );
    this.actualizarPrecioTotal();
 }

 /**
  * Este metodo elimina una pizza creada del resumen
  * @param pizza 
  */
  eliminarPizza(pizza){
    let index = this.combinacion.pizzas.map(function (x) { return x.id; }).indexOf(pizza.id);
    this.combinacion.pizzas.splice(index,1 );
    this.actualizarPrecioTotal();
  }

  /**
   * Este metodo elimina una pizza tradicional del resumen
   * @param pizza 
   */
  eliminarTradicional(pizza){
    let index = this.tradicionales.map(function (x) { return x.id; }).indexOf(pizza.id);
    this.tradicionales.splice(index,1 );
    this.actualizarPrecioTotal();
  }


  /**
   * Este metodo elimina un combo del resumen
   * @param combo 
   */
  eliminarCombo(combo){
    let index = this.combos.map(function (x) { return x.id; }).indexOf(combo.id);
    this.combos.splice(index,1 );
    this.actualizarPrecioTotal();
  }


  /**
   * Metodo para editar  los valores de una pizza desde el resumen
   * @param pizza 
   */
  editarPizza(pizza : Pizza){
    this.navCtrl.push(CrearPizzaPage , {
      objetivo : "editar-pizza",
      pizza : pizza
    
    });
  }

  
  aCarrito(){
    this.bloquearBoton = true;
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    
    loading.present();
    let token = window.localStorage.getItem("userToken");
    let combinacion = {"TOKEN": token }
    let pizzas = []
    let adicionales = [];
    let combos = [];
    this.combinacion.pizzas.forEach(pizza => {
        if(pizza.id != null){
          pizzas.push({"ID" : pizza.id , "CANTIDAD": pizza.cantidad})
        }else{
          let composicion = {"NOMBRE" : "Pizza" , "CANTIDAD": pizza.cantidad,
                            "TAMANO": pizza.tamano.id , "MASA": pizza.masa.id,
                            "BORDE": pizza.borde.id};
          let ingredientes = [];
          pizza.ingredientes.forEach(ingrediente => {
              ingredientes.push({"ID": ingrediente.id , "PORCION": ingrediente.porcion.id})
          });
          composicion["INGREDIENTES"] = ingredientes;
          pizzas.push(composicion);
        }
    });
    this.tradicionales.forEach(pizza=> {
      pizzas.push({"ID" : pizza.id , "CANTIDAD": pizza.cantidad})
    });
    this.combos.forEach(combo=> {
      combos.push({"ID" : combo.id , "CANTIDAD": combo.cantidad})
    });
    this.combinacion.adicionales.forEach( adicional => {
        adicionales.push({"ID": adicional.id , "CANTIDAD": adicional.cantidad})
    });
    combinacion["PIZZAS"] = pizzas;
    combinacion["ADICIONALES"] = adicionales;
    combinacion["COMBOS"] = combos;

    console.log(combinacion)
    this.httpRequest.post(Constantes.CREAR_COMBINACION, combinacion).then((data : any)=>{
      var response = data.json();
      if(response["STATUS"] == 'OK'){
        loading.dismiss();
        this.navCtrl.setRoot(CarritoPage , {
          combinacion : this.combinacion,
          tradicionales : this.tradicionales,
          combos : this.combos
        
        }); 
      }else{
        loading.dismiss();
        this.bloquearBoton = false;
        this.mostrarMensaje("","Estamos teniendo inconvenientes, por favor intenta nuevamente");
      }
    }, (err)=>{
      loading.dismiss();
      this.bloquearBoton = false;
      this.mostrarMensaje("","Estamos teniendo inconvenientes, por favor intenta nuevamente");
    });
    
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
            
          }
        }
     
        
      ]
    });
    alert.present();
    
   }


   eliminarElemento(elemento,tipo) {
    let alert = this.alertCtrl.create({
      title: 'Borrar elemento',
      message: '¿Estás seguro que deseas borrar este elemento de tu resumen? ',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
       
        },
        {
          text: 'Si',
          handler: () => {
            if(tipo == "PIZZA"){
                this.eliminarPizza(elemento)
            }else if( tipo == "ADICIONAL"){
                this.eliminarAdicional(elemento)
            }else if( tipo == "TRADICIONAL"){
                this.eliminarTradicional(elemento)
            }else if(tipo == "COMBO"){
               this.eliminarCombo(elemento);
            }
          }
        }
      ]
    });
    alert.present();
  }
  
}
