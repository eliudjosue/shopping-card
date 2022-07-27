import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { Pedido } from 'src/app/models/pedido.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

 

  pedido: Pedido;
  cliente:Cliente;
  // carritoSuscriber: Subscription;
  // total: number;
  // cantidad: number;

  constructor(public authService:AuthService,
              public carritoService: CarritoService){

            // this.initCarrito();
            this.initCarrito();
            this.loadPedido();

            this.cliente = {
              uid: '',
              email:'',
              nombre:'',
              foto:'',
              referencia:''
            }
                
            this.pedido = {
              uid: '',
              cliente: this.cliente,
              productos: [],
              precioTotal: 0,
              estado: 'enviado',
              fecha: new Date(),
              valoracion: 0
          };
   }

  ngOnInit() {}

  // ngOnDestroy() {
  //     console.log('ngOnDestroy() - carrito componente');
  //     if (this.carritoSuscriber) {
  //        this.carritoSuscriber.unsubscribe();
  //     }
  // }


  // openMenu() {
  //     console.log('open menu');
      
  // }

  loadPedido(){
  this.carritoService.getCarrito().subscribe( res => {
    this.pedido = res;
    console.log(res)
  })
  }

  initCarrito() {
     this.pedido
  }
  
    

//   initCarrito() {
//  this.pedido
//   }

//   getTotal() {
//       this.total = 0;
//       this.pedido.productos.forEach( producto => {
//            this.total = (producto.producto.precioReducido) * producto.cantidad + this.total; 
//       });
//   }

//   getCantidad() {
//       this.cantidad = 0
//       this.pedido.productos.forEach( producto => {
//             this.cantidad =  producto.cantidad + this.cantidad; 
//       });
//   }

//   async pedir() {
//     if (!this.pedido.productos.length) {
//       console.log('añade items al carrito');
//       return;
//     }
//     this.pedido.fecha = new Date();
//     this.pedido.precioTotal = this.total;
//     this.pedido.id = this.authService.getId();
//     const uid = await this.authService.getUid()
//     const path = 'Clientes/' + uid + '/pedidos/' 
//     console.log(' pedir() -> ', this.pedido, uid, path);

//     this.authService.createDoc(this.pedido, path, this.pedido.id).then( () => {
//          console.log('guadado con exito');
//          this.carritoService.clearCarrito();
//     });

   
//   }

}
