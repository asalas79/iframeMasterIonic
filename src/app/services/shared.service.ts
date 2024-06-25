import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private triggerFunctionSubject = new Subject<void>();
  private gatilloMenuconsolidado = new Subject<void>();

  triggerFunction$ = this.triggerFunctionSubject.asObservable();
  MenuConsolidar$ = this.gatilloMenuconsolidado.asObservable();

  constructor() { }

  triggerFunction() {
    this.triggerFunctionSubject.next();
  }

  MenuConsolidar() {
    this.gatilloMenuconsolidado.next();
  }

}
