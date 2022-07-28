import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  
  @Input() producto: Producto;

  constructor(public carritoService: CarritoService) { 
    this.producto = {
      nombre: 'string',
      precio:0,
      description:'',
      foto:'',
      id:'',
      fecha:new Date(),
                    };
  }

  ngOnInit(): void {
  }
  
  addCarrito() {
    // console.log('addCarrito()');
    this.carritoService.addProducto(this.producto);
}


}
