import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng/api';
import { EventEmitter } from '@angular/core';
import { DateCriteria, NumberCriteria, TextCriteria } from '../../domain/data-analysis.domain';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { DatePipe } from '@angular/common'

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
  inputDateValueModel:any;
  inputNumberValueModel:any;
  inputTextValueModel:any;
  minValue: number = 10;
  maxValue: number = 150;
  options: Options = {
    floor: 0,
    ceil: 100000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b style='font-size:8px'>Min Age:" + value+"</b>";
        case LabelType.High:
          return "<b style='font-size:8px'>Max Age:" + value+"</b>";
        default:
          return "<span style='font-size:8px'>" + value+"</span>";;
      }
    }
  };
  @Output() filterChange = new EventEmitter<any>();
  @Input('column') set column(data) {
    if (data) {
      this.columnInfo = data;
    }
  }
  constructor(public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.textCriteriaModel="";
    this.numberCriteriaModel="";
    this.dateCriteriaModel="";
    this.inputDateValueModel="";
    this.inputNumberValueModel="";
    this.inputTextValueModel="";
  }
  onSelect(key,criteriaValue,inputValue){
    if(criteriaValue==undefined || criteriaValue==""){
      alert("Please select criteria condition");
      return;
    } 
    if(criteriaValue=="Number_Range"){
      this.filterChange.emit({field:key.trim(),operator:criteriaValue.trim(),value1:this.minValue,value2:this.maxValue});
    }else{
      this.filterChange.emit({field:key.trim(),operator:criteriaValue.trim(),value:inputValue==undefined?"":inputValue});
    }
  }
  inputChanges(key,criteriaValue,inputValue){
    if(criteriaValue==undefined || criteriaValue==""){
      alert("Please select criteria condition");
      return;
    }
    if(criteriaValue=="Date_is" || criteriaValue=="Date_is_NOT" || criteriaValue=="Date_is_BEFORE" || criteriaValue=="Date_is_AFTER"){
      let latest_date_string =this.datepipe.transform(Date.parse(inputValue), 'yyyy-MM-dd');
      inputValue=latest_date_string;
    }
    this.filterChange.emit({field:key.trim(),operator:criteriaValue.trim(),value:inputValue==undefined?"":inputValue});
  }
  onChangeRange(key,criteriaValue,event){
    if(criteriaValue==undefined || criteriaValue==""){
      alert("Please select criteria condition");
      return;
    }
    let value1=event.value;
    let value2=event.highValue;
    this.filterChange.emit({field:key.trim(),operator:criteriaValue.trim(),value1:value1,value2:value2});
  }
  onChangeRangeInput(key,criteriaValue,value1,value2){
    if(criteriaValue==undefined || criteriaValue==""){
      alert("Please select criteria condition");
      return;
    }
    debugger;
    this.filterChange.emit({field:key.trim(),operator:criteriaValue.trim(),value1:value1,value2:value2});
  }
 
}
