/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { MenuController, NavController } from '@ionic/angular';
import { UiServiceService } from './ui-service.service';
import { EnvironmentService } from './environment.service';
import { App } from '@capacitor/app';
import * as CryptoJS  from  'crypto-js';
import { Definiciones } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url1: string = '';
  urlMaster: string = '';
  idOneSignal: string= '';
  nombreEmpresa: string = '';
  logo: string = '';

  empresa7: string = '';
  token: string = '';
  nombreUsuario1: string = '';
  //empresa: string = null;
  private usuario: any = {};

  constructor( private http: HttpClient,
               private storage: Storage,
               private navCtrl: NavController,
               private ui: UiServiceService,
               private env: EnvironmentService,
               private menuCtrl: MenuController
               ) { storage.create();}

  
  async login( email: string, password: string ) {
    await this.ui.spinerLoading('Iniciando sesión');
    const data = { email, password };
    return new Promise( resolve => {
      this.http.post<Definiciones>(`${ this.url1 }/login`, this.encryptar ( data) ).
        subscribe( async resp => {            
            if(resp.ok){              
              await this.guardarToken( resp.token );
              await this.guardarUsuario (email);
              resolve(true);
            }else{
              this.token = '';
              //this.storage.clear();
              resolve( false );
            }
        }).add(() => {
          this.ui.spinerCerrar();
        });
    });
  }

  encryptar( parametro: any ){

    const key = CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef');
    const iv: any =  CryptoJS.enc.Hex.parse('abcdef9876543210abcdef9876543210');
    return parametro = CryptoJS.AES.encrypt(JSON.stringify(parametro), key, { iv }).toString();
    //Desencriptar
    //usuario = JSON.parse(CryptoJS.AES.decrypt(usuario, key, { iv }).toString(CryptoJS.enc.Utf8));
  } 

  getUsuario1(){
    return this.http.get<any>(`${ this.url1 }/getusuario/`);
  }

  getUsuario() {

    if( !this.usuario.id ){
      this.validaToken();
    }

    return { ...this.usuario };
  }

  actualizarUsuario( usuario: any){
    const form = new FormData();
    if(usuario.blob){
      form.append('image', usuario.blob, 'myfile.jpg');
    }

    const datos = this.encryptar(usuario);

    //console.log(datos);
    form.append('datos',datos);

    return new Promise ( resolve  => {
        this.http.post<Definiciones>(`${ this.url1 }/userupdate`,form).
        subscribe( resp =>{
          //console.log(resp);
          
          if(resp.ok){
            this.guardarToken( resp.token );
            resolve(resp);
          }else{
            resolve(false);
          }
        });
    });
  }

  logout(){
    this.token   = '';
    this.usuario = '';
    this.storage.clear();
    this.menuCtrl.toggle();
    App.exitApp();
    this.navCtrl.navigateRoot('/login',{ animated: true });
  }

  async guardarToken( token: string ) {
    this.token = token;
    await this.storage.set('token', token);
    //await this.validaToken();
  }

  async guardarUsuario( usuario: string ) {
    this.nombreUsuario1 = usuario;
    await this.storage.set('nombreUsuario', usuario);    
  }

  async cargarToken(){
   this.token         = await this.storage.get('token') || null;
   this.nombreUsuario1 = await this.storage.get('nombreUsuario') || null;
  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();
    await this.cargarEmpresaCodigo();

    if(!this.empresa7)
    {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    if( !this.token ){
      this.logout()
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {
      this.http.get<Definiciones>(`${ this.url1 }/usertoken/`).
        subscribe(resp => {
         // console.log( resp );          
          if(resp.ok){            
            this.usuario = resp.usuario;
            resolve(true);
          }else{
            //1027: En el servidor la forma de recibir el token es diferente
            this.ui.presentToast('Problemas con el token de usuario, [1027]','danger');
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }

        });

    });
  }

  async guardarEmpresaCodigo(empresaCodigo: string) {

    const entorno = await this.env.entorno(empresaCodigo);
    if(entorno){
      //console.log(entorno.url);
      this.url1 = entorno.url;
      this.empresa7 = empresaCodigo;
      this.urlMaster = entorno.urlMaster;
      this.idOneSignal = entorno.idOneSignal;
      this.nombreEmpresa = entorno.nombreEmpresa;
      this.logo = entorno.logo;
      await this.storage.set('empresaCodigo', empresaCodigo);
      return true;
    }else{
      return false;
    }
  }
  
  async cargarEmpresaCodigo(){
    this.empresa7 = await this.storage.get('empresaCodigo') || null;    
    //this.ui.presentToast(this.empresa7);
    if(this.empresa7){
      try {
        const entorno = await this.env.entorno(this.empresa7);
        this.url1 = entorno.url;
        this.urlMaster = entorno.urlMaster;
        this.idOneSignal = entorno.idOneSignal;
        this.nombreEmpresa = entorno.nombreEmpresa;
        this.logo = entorno.logo;
      } catch (error) {
        console.error(error);
      }
    }
  }

}
