import { Component,OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { UrlsService } from 'src/app/services/urls.service'; 
import { SharedService } from 'src/app/services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private subscription?: Subscription;

  urlMaster: string = this.usuarioService.urlMaster;
  nombreEmpresa: string = '';
  nombreUsuario1: string = '';
  iframeSrc: SafeResourceUrl;
  colorBackground: string = '';
  colorFont: string = '';
  subMenus: { [key: string]: boolean } = {};

  constructor(
     private sanitizer: DomSanitizer ,
     private usuarioService:UsuarioService,
     private ui:UiServiceService, 
     private urlsService: UrlsService,
     private sharedService: SharedService
    ) { 
    this.iframeSrc = '';
  }

  async ngOnInit() {

    this.subscription = this.sharedService.triggerFunction$.subscribe(() => {
      this.activarMenuIframe();
    });

    this.subscription = this.sharedService.MenuConsolidar$.subscribe(() => {
      this.activarMenuIConsolidadoframe();
    });

    this.urlsService.currentIframeUrl.subscribe( url =>{

      if(url){        
        this.updateIframeSrc(url);
      }else{
        const token          = this.usuarioService.token;   
        const urlMaster      = this.usuarioService.urlMaster; 
        this.nombreEmpresa   = this.usuarioService.nombreEmpresa.substring(0, 17); 
        this.nombreUsuario1  = this.usuarioService.nombreUsuario1;  
        this.colorBackground = '#3880ff';
        this.colorFont       = '#ffffff';
        const url            = `${urlMaster}?tokenion=${token}`;   
        this.iframeSrc       = this.sanitizer.bypassSecurityTrustResourceUrl(url);  
      }

    });
    
    this.ui.spinerLoading('Cargando..');
    setTimeout(() => {
      this.ui.spinerCerrar();
    }, 1000);       
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  activarMenuIConsolidadoframe() {    
    const iframe = (document.getElementById('miIframe') as HTMLIFrameElement).contentWindow;
    if (iframe) {      
      iframe.postMessage({
      action: 'llamarFuncionMenuConsolidado',
      url: this.urlMaster
    }, this.urlMaster);
    }
  }

  activarMenuIframe() {    
    const iframe = (document.getElementById('miIframe') as HTMLIFrameElement).contentWindow;
    if (iframe) {      
      iframe.postMessage({
      action: 'llamarFuncionPushMenu',
      url: this.urlMaster
    }, this.urlMaster);
    }
  }

  updateIframeSrc(url: string) {    
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlMaster+url);     
  }

  toggleSubMenu(menu: string) {
    this.subMenus[menu] = !this.subMenus[menu];    
  }

  

}
