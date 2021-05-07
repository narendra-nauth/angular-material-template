import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRoutingModule } from './bill-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BillComponent } from './bill/bill.component';

@NgModule({
  declarations: [BillComponent],
  imports: [
    CommonModule,
    BillRoutingModule,
    SharedModule
  ],
  entryComponents: []
})
export class BillModule { }
