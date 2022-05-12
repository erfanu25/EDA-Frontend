import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DateCriteria, EmpDetails, NumberCriteria, TableType, TextCriteria } from "./../domain/data-analysis.domain";

@Component({
  selector: 'app-advance-filter',
  templateUrl: './advance-filter.component.html',
  styleUrls: ['./advance-filter.component.css']
})
export class AdvanceFilterComponent implements OnInit {

  headers: string[];
  textCriteria: SelectItem[] = TextCriteria;
  dateCriteria: SelectItem[] = DateCriteria;
  numberCriteria: SelectItem[] = NumberCriteria;
  details: EmpDetails[];
  filterDropDownCriteria: "";
  advanceFilterList = [];

  @Input('columnWithTypes') set columnWithTypes(data) {
    if (data) {
      this.headers = data;
      console.log(this.headers);
    }
  }
  @Output() filterListChange = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  updatedFilter(obj) {
    console.log(obj);

    if (this.advanceFilterList.some(item => item.key.trim() === obj.key.trim() )) {
      console.log("exist:update");
      let itemIndex = this.advanceFilterList.findIndex(item => item.key.trim() === obj.key.trim());
      if(obj.inputValue== undefined || obj.inputValue == "" ){
        this.advanceFilterList.splice(itemIndex,1);
      }else{
        this.advanceFilterList[itemIndex] = obj;
      }

    } else {
      console.log("not exist:insert");
      if(obj.inputValue!==""){
        this.advanceFilterList.push(obj);
      }
    }
  }
  onApply() {
    console.log(this.advanceFilterList);
    this.filterListChange.emit(this.advanceFilterList);

  }
}
