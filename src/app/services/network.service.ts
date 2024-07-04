import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private networkStatus = new BehaviorSubject<boolean>(true);

  constructor() { this.initializeNetworkEvents(); }

  private async initializeNetworkEvents() {
    const status = await Network.getStatus();
    this.networkStatus.next(status.connected);

    Network.addListener('networkStatusChange', status => {
      this.networkStatus.next(status.connected);
    });
  }

  getNetworkStatus() {
    return this.networkStatus.asObservable();
  }

  
}
