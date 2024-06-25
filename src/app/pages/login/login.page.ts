import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from '../../services/usuario.service';
import { SplashScreen } from '@capacitor/splash-screen';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements  OnInit { 

  loginUser = {
    email:'',
    password: '',
    empresaCodigo: ''
  };

 /* loginUser = {
    email:'super',
    password: '1234567',
    empresaCodigo: '1100'
  };  */

  registerUser: any = {};

  recuperar: any = {
    email2: null
  };

  paises:   any[] =  [];
  estados:  any[] =  [];
  ciudades: any[] =  [];

  vista = false;
  nombreEmpresa: string = '';
  logo: string = '';

  constructor( private usuarioService: UsuarioService,
               private navCtrl: NavController,
               private uiservice: UiServiceService
               ) {
  }

  async ngOnInit() {       
    await this.usuarioService.cargarEmpresaCodigo(); 
    this.loginUser.empresaCodigo = this.usuarioService.empresa7;   
  }  

  async ionViewWillEnter(){
    await SplashScreen.hide();
  }

  async evaluarCodigo(){
    if(this.loginUser.empresaCodigo){
        const verCodigo = await this.usuarioService.guardarEmpresaCodigo( this.loginUser.empresaCodigo );
        if ( verCodigo ) {          
          this.vista = true;          
          this.nombreEmpresa = this.usuarioService.nombreEmpresa;
          this.logo = `${ this.usuarioService.urlMaster }/images/logos/${this.usuarioService.logo}`;
        }else{
          this.uiservice.presentToast('No existe este código de empresa','danger');
        }
    }else{
      this.uiservice.presentToast('Colocar un código de empresa','danger');
    }
  }

  async login( fLogin: NgForm){
    if( fLogin.invalid){
      this.uiservice.alertaInformativo('Por favor colocar un usuario o contraseña');
      return;
    }    
    const valido = await this.usuarioService.login ( this.loginUser.email, this.loginUser.password);    

    if( valido ){
      this.navCtrl.navigateRoot( `/home`,{ animated: true } );
    }else{
      this.uiservice.alertaInformativo('Usuario o contraseñas no son correctos!');
    }
  }  



}
