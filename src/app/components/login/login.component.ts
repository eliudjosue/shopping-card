import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  usuario = {
    email:'',
    password:''
  }

  Ingresar(){
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.authService.login(email, password).then(res => {
      console.log("Ingreso :", res);
      this.router.navigate(['/home']);
    })
  }

  Registrar(){
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.authService.register(email, password).then(res => {
      console.log("Se registro :", res)
  })
}


  ingresarConGoogle(){
    const { email, password } = this.usuario;
    this.authService.loginWithGoogle(email, password).then(res => {
      console.log("Se registro :", res)
      this.router.navigate(['/home']);
    })
  }

}
