import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { NavController } from '@ionic/angular';

export const usuarioGuard: CanActivateFn = (route, state) => {
  
  const usuarioService = inject(UsuarioService);
  const navCtrl = inject(NavController);
  
  const isAuthenticated = usuarioService.validaToken();
  
  if (!isAuthenticated) {
    navCtrl.navigateRoot('/login');
  }  
  return isAuthenticated;
};



