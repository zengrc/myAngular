import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { PaginationModule } from 'ngx-bootstrap';

import { SimpleTableComponent } from './ngx-simple-table.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  declarations: [ SimpleTableComponent ],
  exports: [SimpleTableComponent]
})
export class SimpleTableModule { }
