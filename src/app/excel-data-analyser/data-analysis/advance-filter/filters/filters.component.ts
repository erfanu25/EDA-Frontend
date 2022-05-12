import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng/api';
import { EventEmitter } from '@angular/core';
import { DateCriteria, NumberCriteria, TextCriteria } from '../../domain/data-analysis.domain';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  textCriteria: SelectItem[] = TextCriteria;
  dateCriteria: SelectItem[] = DateCriteria;
  numberCriteria: SelectItem[] = NumberCriteria;
  columnInfo:any;
  textCriteriaModel:any;
  numberCriteriaModel:any;
  dateCriteriaModel:any;
  selectedDate:any;
  @Output() filterChange = new EventEmitter<any>();

  

  @Input('column') set column(data) {
    if (data) {
      this.columnInfo = data;
      console.log(this.columnInfo);
    }
  }
  constructor() { }

  ngOnInit(): void {
  }
  onSelect(key,criteriaValue,inputValue){
    if(criteriaValue==undefined || criteriaValue==""){
      alert("Please select criteria condition");
      return;
    }//getting some error sometime while inputValue has same name like  criteriaValue
    this.filterChange.emit({field:key.trim(),operator:criteriaValue.trim(),value:inputValue.trim()});
  }
  inputChanges(key,criteriaValue,inputValue){
    if(criteriaValue==undefined || criteriaValue==""){
      alert("Please select criteria condition");
      return;
    }
    this.filterChange.emit({field:key.trim(),operator:criteriaValue.trim(),value:inputValue.trim()});
  }
  


}
