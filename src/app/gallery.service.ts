import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ImageItem, GalleryItem } from '@ngx-gallery/core';
import { IMG_URLS } from './gallery-mock';


@Injectable({
  providedIn: 'root',
})
export class GalleryService {

  constructor() { }

  getImages(): Observable<GalleryItem[]> {
    return of(IMG_URLS.map((url) => new ImageItem({src: url, thumb: url})));
  }
}
