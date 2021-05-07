import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadingRoutingModule } from './reading-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReadingComponent } from './reading/reading.component';

@NgModule({
  declarations: [ReadingComponent],
  imports: [
    CommonModule,
    ReadingRoutingModule,
    SharedModule
  ],
  entryComponents: []
})
export class ReadingModule { }
