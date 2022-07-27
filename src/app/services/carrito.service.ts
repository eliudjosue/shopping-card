import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'
import { find } from 'rxjs/operators'
import { Pedido } from '../models/pedido.model';
import { Cliente } from '../models/cliente.model';
import { EstadoPedido, Producto } from '../models/producto.model';
import { ProductoPedido } from '../models/productoPedido.model';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private pedido: Pedido;
  pedido$ = new Subject<Pedido>();
  path = 'carrito/';
  uid = '';
  public cliente: Cliente;
  

  constructor(public authService: AuthService,
              public router: Router) {
      this.initCarrito()
      this.authService.stateAuth().subscribe( res => {
      console.log(res);
      if (res !== null) {
        this.uid = res.uid;
        // console.log(res.uid)
        this.loadCliente();
      }
    });

    this.cliente = {
    uid: '',
    email:'',
    nombre:'',
    foto:'',
    referencia:''
    }

  

    this.pedido = {
      uid:'',
      cliente:this.cliente,
      productos: [],
      precioTotal:0,
      estado:'enviado',
      fecha:new Date(),
      valoracion:0,
    }

    
   }

   loadCarrito(){
    const path = 'Clientes/' +  this.uid + '/' + 'carrito';
    this.authService.getDoc(path, this.uid).subscribe( res => {
      console.log(res);
      if (res) {
        res = this.pedido;
        this.pedido$.next(this.pedido);
      } else {
        this.initCarrito();
      }
    });
   }

   initCarrito() {
    this.pedido 
    }

   loadCliente(){
    const path = 'Clientes';
    this.authService.getDoc<Pedido>(path, this.uid).subscribe( res  => {
        res = this.pedido 
        this.loadCarrito()      
    })
   }

   getCarrito(): Observable<Pedido>{
    setTimeout(() => {
      this.pedido$.next(this.pedido);
  }, 100);
   return this.pedido$.asObservable()
   }

   addProducto<type>(producto: Producto){
    if (this.uid.length) {
      const item = this.pedido.productos.find( productoPedido => {
        return (productoPedido.producto.id === producto.id)
      });
      if(item !== undefined){
        item.cantidad ++;
      }else{
        const add: ProductoPedido = {
          cantidad: 1,
          producto:producto 
        };
        this.pedido.productos.push(add);
        }
    } else {
      this.router.navigate(['/login']);
      return
    }
    // console.log('en add pedido --> ', this.pedido);
    const  path = 'Clientes/' + this.uid + '/' + this.path;
    this.authService.createDoc(this.pedido, path, this.uid).then( () => {
      // console.log('añadido conexito')
    })
   }

   removeProducto(producto: Producto) {
    console.log('removeProducto ->', this.uid);
    if (this.uid.length) {
        let position = 0;
        const item = this.pedido.productos.find( (productoPedido, index) => {
            position = index;
            return (productoPedido.producto.id === producto.id)
        });
        if (item !== undefined) {
            item.cantidad --;
            if (item.cantidad === 0) {
                 this.pedido.productos.splice(position, 1);
            }
            console.log('en remove pedido -> ', this.pedido);
            const path = 'Clientes/' + this.uid + '/' + this.path;
            this.authService.createDoc(this.pedido, path, this.uid).then( () => {
                console.log('removido con exito');
            });
        }
    }
}


   realizarPedido(){

   }

   clearCarrito() {
    const path = 'Clientes/' + this.uid + '/' + 'carrito';
    this.authService.deleteDoc(path, this.uid).then( () => {
        this.initCarrito();
    });
}
}
