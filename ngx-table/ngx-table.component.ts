import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'ngx-table',
  templateUrl: './ngx-table.component.html',
  styleUrls: ['./ngx-table.component.scss']
})
export class NgxTableComponent implements OnInit, OnChanges {

  @Input() tableTitles: Array<{id:string,name:string,sort:boolean, type:number}>=[];
  @Input() tableRows: Array<any>=[]; 
  @Input() paginationOptions: { 
    totalItems: number,
    maxSize: number,
    itemsPerPage: number,
    currentPage: number,
    sort: string,
  } = {
    totalItems: 0,
    maxSize: 5,
    itemsPerPage: 10,
    currentPage: 1,
    sort: "0/#none",
  }

  @Output() onPageChanged = new EventEmitter();
  @Output() onSortClicked = new EventEmitter();

  tableRowsShown: Array<any>=[];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    if (Object.keys(changes).includes("tableRows")){
      let i = (this.paginationOptions.currentPage - 1) * this.paginationOptions.itemsPerPage;
      let j = this.paginationOptions.currentPage * this.paginationOptions.itemsPerPage;
      this.tableRowsShown = this.tableRows.slice(i,j);
    }
  }

  emitWhenPageChanged(event): void {
    let i = (event.page - 1) * this.paginationOptions.itemsPerPage;
    let j = event.page * this.paginationOptions.itemsPerPage;
    this.tableRowsShown = this.tableRows.slice(i,j);
    this.onPageChanged.emit(event);
  }

  emitWhenSortClicked(event): void {
    this.onSortClicked.emit(event);
  }

}
