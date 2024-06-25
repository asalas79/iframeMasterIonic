import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  ruta = {
    url          : null,
    urlMaster    : null,
    idOneSignal  : null,
    nombreEmpresa: null,
    logo         : null
  };

  constructor(private http: HttpClient) { }

  getempresa( codigo: string){   
    const urlApi = 'https://6653731api.managercargo.com/public/web/apiventas';
    const data   = { codigo };
    return this.http.post<any>(`${ urlApi }/getcodigoempresa`,data);
  }

  async entorno(codigo: string): Promise<any> {
    return new Promise(resolve => {
      this.getempresa(codigo).subscribe(resp => {
        if(resp.ok){
          //console.log(resp);
          const entorno = {
            url          : `${resp.empresas[0].url}/public/api/apimaster`,
            urlMaster    : `${resp.empresas[0].url}/public`,
            idOneSignal  : 'ad976630-fa83-4e7c-add0-a113340a76b4',
            nombreEmpresa: `${resp.empresas[0].nombre}`,
            logo         : `${resp.empresas[0].logo}`
          };
          resolve(entorno);
        }else{
          resolve(false);
        }
      });
    });
  }

  /*
  entorno( codigo: string){
    if( codigo === '1000' ){
      return this.ruta = {
        url          : 'http://192.168.1.11:80/managercargo-php8/public/web/apicuenta',
        urlMaster    : 'http://192.168.1.11:80/managercargo-php8/public',
        idOneSignal  : 'ad976630-fa83-4e7c-add0-a113340a76b4',
        nombreEmpresa: 'MASTER'
      };
    }

    if( codigo === '1100' ){
      return this.ruta = {
        url          : 'https://demo.managercargo.com/public/web/apicuenta',
        urlMaster    : 'https://demo.managercargo.com/public',
        idOneSignal  : 'ad976630-fa83-4e7c-add0-a113340a76b4',
        nombreEmpresa: 'DEMO MANAGERCARGO SOFTWARE INTERNATIONAL'
      };
    }
    return this.ruta;
  }*/

}
