import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(  private alertController: AlertController,
                private toastController: ToastController,
                private loadingController: LoadingController
                ) { }

  async alertaInformativo(message: string,url?: string) {
    const alert = await this.alertController.create({
      message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            if(url){
              //console.log('ok');
            }else{
              //console.log('no haga nada');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast( message: string, color1?: string, duracion: number = 1500 ) {

    const toast = await this.toastController.create({
      message,
      position:'top',
      duration: duracion,
      color: color1
    });
    await toast.present();
  }

  async spinerLoading( mensaje: string) {
    const loading = await this.loadingController.create({
      message: mensaje
    });

    await loading.present();
  }


  spinerCerrar(){
    this.loadingController.dismiss();
  }


}
