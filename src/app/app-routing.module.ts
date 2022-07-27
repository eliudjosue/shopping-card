import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { FormProductosComponent } from './components/form-productos/form-productos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { pathMatch:'full', path:'', redirectTo:'home'},
  { path:'login', component:LoginComponent},
  { path: 'home', component:HomeComponent},
  { path:'form-produc', component:FormProductosComponent},
  { path:'cart', component:CartComponent},
  { path:'**', component:NotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
