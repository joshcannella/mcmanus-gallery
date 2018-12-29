import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Gallery, GalleryItem, ImageItem } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { Pixabay } from '../../service/pixabay.service';

import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {

  items: GalleryItem[];
  images$: Observable<GalleryItem[]>;

  constructor(public gallery: Gallery, public lightbox: Lightbox, private _title: Title, private galleryService: GalleryService) {
    
  }
  
  ngOnInit() {
    this._title.setTitle('Gallery | McManus Amusements');

    /* const url = 'assets/gallery/ABC-Block-Candy-Wheel-Game-Trailer.png';
    this.items = [
      new ImageItem({ src: url, thumb: url }),
      new ImageItem({ src: url, thumb: url }),
      new ImageItem({ src: "assets/gallery/img1.jpg", thumb: "assets/gallery/img1.jpg" }),
      new ImageItem({ src: "assets/gallery/Tent.png", thumb: "assets/gallery/Tent.png" })
      // ... more items
    ]; */

    this.images$ = this.galleryService.getImages().pipe(
      map((items: GalleryItem[]) => {
        this.gallery.ref('myGallery', {
          thumbPosition: 'top'
        }).load(items); 

        return items;
      })
    );
  }

  ngOnDestroy() {
    this.gallery.ref('myGallery').destroy();
  }

}
