import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTableModule } from '../ngx-simple-table/ngx-simple-table.module';
import { NgxTableComponent } from './ngx-table.component'

@NgModule({
  imports: [
    CommonModule,
    SimpleTableModule
  ],
  declarations: [NgxTableComponent],
  exports: [ NgxTableComponent ]
})
export class NgxTableModule { }
