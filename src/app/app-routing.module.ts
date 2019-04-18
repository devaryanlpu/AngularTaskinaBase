import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
const routes: Routes = [
      { path: '', children: [
        { path: '', pathMatch: 'full', loadChildren: './home/home.module#HomeModule' }, 
        { path: 'how-it-works', loadChildren: './how-it-works/how-it-works.module#HowItWorksModule' },
        { path: 'browse-tasks',  loadChildren: './browse-task/browse-task.module#BrowseTaskModule' }  
      ]},
      {
        "path": "error_404",
        "component": ErrorPageComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
