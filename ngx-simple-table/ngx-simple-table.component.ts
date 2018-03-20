import { EventEmitter, Component, OnInit, OnChanges, 
  ViewContainerRef, AfterViewInit, AfterViewChecked, AfterContentInit,
  SimpleChange, Input, Output, ViewChild, ViewChildren, 
  ComponentFactoryResolver, QueryList} from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
//import { EventEmitter } from 'selenium-webdriver';
import {ComponentTypeIput} from './component-type-input';

@Component({
  selector: 'ngx-simple-table',
  templateUrl: './ngx-simple-table.component.html',
  styleUrls: ['./ngx-simple-table.component.scss']
})
export class SimpleTableComponent implements OnInit, OnChanges {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { 
  }

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

  @ViewChildren('spItemsHost',{read: ViewContainerRef}) public spItemsHost: QueryList<ViewContainerRef>;

  //@Input() data: Array<any>;
  //dataRows: Array<any>=[];
  //@Input() spItems: ComponentTypeIput;
  //@ViewChild('spItemsHost',{read: ViewContainerRef}) spItemsHost:ViewContainerRef;
  identifiedIndex: {plainColumnIndex: Array<any>, spColumnIndex: Array<any>} 
  = {plainColumnIndex: [], spColumnIndex: []}

  ngOnInit() {
    this.identifiedIndex = this.identifyColumn();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    //if (Object.keys(changes)[0]=="tableRows"){
      //this.dataRows = this.tableRows.map((row,i) => {
        //let dr = []
        //for (let j = 0; j < this.tableTitles.length; j++){
          //dr[this.tableTitles[j].id] = row[this.tableTitles[j].id];
          //dr[dr.length] = row[this.tableTitles[j].id];
        //}
        //return dr;
      //});
      //this.generateSpItems(spColumnIndex);
    //}
    //if (Object.keys(changes)[0]=="tableTitles"){
      //console.log(changes)
    //}
  }

  identifyColumn() {
    let plainColumnIndex: Array<any>=[];
      let spColumnIndex: Array<any>=[];
      this.tableTitles.map((th,i)=>{
        if(th.type == 0) plainColumnIndex.push(i);
        else if(th.type == 1) spColumnIndex.push(i);
      });
      return {plainColumnIndex: plainColumnIndex, spColumnIndex: spColumnIndex}
  }

  generateSpItems(spColumnIndex: Array<any>) {
    let vcIndex = 0;
    for(let rowIndex = 0; rowIndex < this.tableRows.length; rowIndex++){
      for(let columnIndex = 0; columnIndex < spColumnIndex.length; columnIndex++){
        let obj = this.tableRows[rowIndex][this.tableTitles[spColumnIndex[columnIndex]].id]
        let spItem = obj.component;
        let spData = obj.data;
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(spItem)
        let vcRef = this.spItemsHost.toArray()[vcIndex];
        vcIndex++;
        vcRef.clear();
        let spComponent = vcRef.createComponent(componentFactory);
        (<any>spComponent.instance).data = spData;
        //console.log(spItem);
      }
    }
  }

  ngAfterContentInit(){
    //console.log("con",this.spItemsHost);
  }

  ngAfterViewInit() {
    //console.log("view",this.spItemsHost);
    //console.log(this.spItemsHost);
    setTimeout(()=>this.generateSpItems(this.identifiedIndex.spColumnIndex));
    this.spItemsHost.changes.subscribe((list) => {
      setTimeout(()=>this.generateSpItems(this.identifiedIndex.spColumnIndex));
    });
  }

  ngAfterViewChecked() {
    //let identifiedIndex = this.identifyColumn();
    //let spColumnIndex = identifiedIndex.spColumnIndex;
    //this.generateSpItems(spColumnIndex);
    //console.log(this.tableRows.length)
    //let spItem = this.spItems.component;
    //let componentFactory = this.componentFactoryResolver.resolveComponentFactory(spItem)
    //let viewContainerRef = this.spItemsHost;
    //viewContainerRef.clear();
    //let test1 = viewContainerRef.createComponent(componentFactory);
    //(<any>test1.instance).data = this.spItems.data;
  }

  tableSort(objId, currentSort:number): void {
    let sortMethod = (currentSort + 1) % 3
    let sort: Array<string> = ["none","asc","desc"]
    this.paginationOptions.sort = sort[sortMethod] + "/#" + objId;
    this.paginationOptions.currentPage = 1;
    //this.getApplications(0,this.paginationOptions.itemsPerPage,sort[sortMethod],objId);
    this.onSortClicked.emit({sortMethod: sort[sortMethod], sortId: objId});
  }

  checkSortStatus(id, sort): boolean {
    let sortName = sort + "/#" + id;
    return (sortName == this.paginationOptions.sort)
  }

  pageChanged(event): void {
    this.onPageChanged.emit(event);
  }
}
