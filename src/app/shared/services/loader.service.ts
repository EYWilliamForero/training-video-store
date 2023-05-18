import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoaderActiveObservable: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  isLoaderActive$: Observable<boolean> =
    this.isLoaderActiveObservable.asObservable();

  showLoader() {
    this.isLoaderActiveObservable.next(true);
  }

  closeLoader() {
    this.isLoaderActiveObservable.next(false);
  }
}
