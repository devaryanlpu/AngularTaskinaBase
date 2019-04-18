import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { OwlCarousel } from 'ngx-owl-carousel';
@Component({
  selector: 'taskina-banner',
  templateUrl: './bannerSection.component.html',
  styleUrls: ['./style.scss']
})
export class BannerSectionComponent implements OnInit {
@ViewChild('slide') owlSlider : OwlCarousel;

 nextSlide() {
   this.owlSlider.next();
 }

 previousSlide() {
     this.owlSlider.previous();
 }
 
  customOptions: any = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    nav: true,
    navSpeed: 700,
    navText : ["<i class='icon icon-arrow-left'></i>", "<i class='icon icon-arrow-right'></i>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    
  }
  constructor() { }
  ngOnInit() {
  }

}
