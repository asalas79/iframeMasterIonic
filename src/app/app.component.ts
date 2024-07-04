import { Component ,OnInit} from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {    

  constructor( private platform: Platform ) { 
      this.cargar();    
  }

  async ngOnInit() {    
  }  
  
  async cargar(){
    
    await SplashScreen.show({
       //showDuration: 2000,
       // autoHide: true
     });

     this.platform.ready().then(() => {
      App.addListener('backButton', ({ canGoBack }) => {
        if (canGoBack) {
          window.history.back();
        } else {
          // Si no se puede retroceder, puedes manejar la acción aquí
          // como cerrar la aplicación o mostrar una confirmación          
          App.exitApp();
        }
      });
    });
  }   

}
