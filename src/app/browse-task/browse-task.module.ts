import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { BrowseTaskComponent } from './browse-task.component';
import { BrowseTaskRoutingModule } from './browse-task-routing.module';




@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    SharedModule,
    BrowseTaskRoutingModule
  ],
  declarations: [
    BrowseTaskComponent
  ],
  exports: [ 
    BrowseTaskComponent
  ],
  providers: [

  ]
})
export class BrowseTaskModule {}
