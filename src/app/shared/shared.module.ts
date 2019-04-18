import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerSectionComponent } from './components/banner-section/bannerSection.Component';
import { FeaturedCategoryComponent } from './components/featured-category/featuredCategory.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DialogModule } from 'primeng/primeng';
import { HttpClientModule } from "@angular/common/http";

//Components
import { HeaderComponent } from '../layouts/header/header.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { LoginDialogComponent } from '../Auth/login/login-dialog.component';
import { SignupDialogComponent } from '../Auth/signup/signup-dialog.component';
//Services
import { LoginDialogService } from '../Auth/login/login-dialog.service';
import { SignupDialogService } from '../Auth/signup/signup-dialog.service';
import { ErrorDialogComponent } from './dialogs/error-dialog/dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CarouselModule,
    DialogModule,
    HttpClientModule
  ],
  declarations: [
    BannerSectionComponent,
    FeaturedCategoryComponent,
    HeaderComponent,
    FooterComponent,
    LoginDialogComponent,
    SignupDialogComponent,
    ErrorDialogComponent
  ],
  exports: [
    BannerSectionComponent,
    FeaturedCategoryComponent,
    HeaderComponent,
    FooterComponent,
    LoginDialogComponent,
    SignupDialogComponent,
    ErrorDialogComponent
  ],
  providers:[
    LoginDialogService,
    SignupDialogService,
    HeaderComponent
  ]
})
export class SharedModule { }
