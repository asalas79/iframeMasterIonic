import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  private iframeUrlSource = new BehaviorSubject<string>('');
  currentIframeUrl        = this.iframeUrlSource.asObservable();

  constructor() { }

  updateIframeUrl(url: any) {    
    this.iframeUrlSource.next(url);
  }

}
