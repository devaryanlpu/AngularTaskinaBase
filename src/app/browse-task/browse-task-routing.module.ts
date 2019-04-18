import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseTaskComponent } from './browse-task.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    { path: '', component: BrowseTaskComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BrowseTaskRoutingModule {}
