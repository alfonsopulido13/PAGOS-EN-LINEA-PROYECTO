import { Component } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams,InfiniteScroll,LoadingController, AlertController  } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { ViewChild } from '@angular/core';
import { ValoresPage  } from '../valores/valores';
import { Constantes } from '../../util/constantes';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { HomePage } from '../home/home';



import 'rxjs/add/operator/map';


/**
 * Generated class for the CarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-carritoP',
  templateUrl: 'carritoP.html',
})
export class CarritoPPage {
  carritoPs: any;
  productos: any;
  totalCarrito : number = 0;

  public pizzas =  []
  public adicionales = []
  public combos = []

  public cargando = false;

  public costoTotal : Number;




  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Nav) nav: Nav;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public httpRequest : HttpRequestProvider, 
    public loadingCtrl: LoadingController,
    public alertCtrl : AlertController ,
    private carritoPProvider: ApiServiceProvider) {
    this.getProductos();
    
    
  }

  getTotal(){
    this.totalCarrito = 0;
    for (let p of this.productos){
      this.totalCarrito += Number(p.precio) * Number(p.cantidad);
    }
    console.log(this.totalCarrito);
  }

  getProductos() {
    this.carritoPProvider.getProductos()
    .then(data => {
      this.productos = data;
      console.log(this.productos);
      this.getTotal();
      for (let producto of this.productos){
        producto['select'] = false;
      }
    });
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

  async addCantidad(event, producto) {
                
    const productoAdd = {
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        cantidad: producto.cantidad + 1,
    };
            
    await this.carritoPProvider.setProducto(producto.idP, productoAdd);
    this.getProductos();    
}

async removeCantidad(event, producto) {
                
  const productoAdd = {
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      cantidad: producto.cantidad - 1,
  };

  if (producto.cantidad > 1){
    await this.carritoPProvider.setProducto(producto.idP, productoAdd);
    this.getProductos();
  }
}

  async eliminarProducto(event, productoId) {
    await this.carritoPProvider.deleteProducto(productoId); 
    this.getProductos(); 
  }


  goPage(){
    
    this.navCtrl.setRoot(ValoresPage)
  }




}
