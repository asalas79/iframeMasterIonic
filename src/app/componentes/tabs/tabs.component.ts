import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { UrlsService } from 'src/app/services/urls.service';
import { NavController, MenuController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {

  nombreUsuario1: string = '';
  nombreEmrpesa: string = '';
  subMenus: { [key: string]: boolean } = {};

  constructor(
      private sharedService: SharedService,
      private urlsService: UrlsService,
      private menuCtrl: MenuController,
      private navCtrl: NavController,
      private usuarioService:UsuarioService) { }

  async ngOnInit() { 
    
        try {
          const token = await this.usuarioService.validaToken();      
          if(token){
            this.nombreUsuario1  = this.usuarioService.nombreUsuario1;     
            this.nombreEmrpesa   = this.usuarioService.nombreEmpresa;    
          }
          
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
  }

  enviarMensaje(){
    this.sharedService.triggerFunction();
  }  

  MenuConsolidar(){
    this.sharedService.MenuConsolidar();
  }

  updateIframeSrc(url: string) {      
    this.urlsService.updateIframeUrl(url);
    this.menuCtrl.close();   
  }

  goBack() {
    this.navCtrl.back();
  }

  toggleSubMenu(menu: string) {
    this.subMenus[menu] = !this.subMenus[menu];    
  }

  logout() {    
    this.usuarioService.logout();
  }

  
  toggleMenu() {
    this.menuCtrl.isOpen().then((isOpen) => {
      if (isOpen) {
        this.menuCtrl.close();
      } else {
        this.menuCtrl.open();
      }
    });
  }

}
