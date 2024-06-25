
import { inject  } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { catchError} from 'rxjs/operators';
import { ToastController } from '@ionic/angular';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const usuarioService = inject(UsuarioService);
  //const toastController = inject(ToastController);
  const token = usuarioService.token;

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        'x-token' : token
      }
    });
    return next(clonedReq);
  } else {
    return next(req);
  }

  
};
