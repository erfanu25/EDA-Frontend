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
          return "<b style='font-size:8px'>Min :" + value+"</b>";
        case LabelType.High:
          return "<b style='font-size:8px'>Max :" + value+"</b>";
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
  onSelect(field,operator,inputValue){
    if(operator==undefined || operator==""){
      alert("Please select criteria condition");
      return;
    } 
    if(operator=="Number_Range"){
      this.filterChange.emit({field:field.trim(),operator:operator.trim(),value1:this.minValue,value2:this.maxValue});
    }else{
      this.filterChange.emit({field:field.trim(),operator:operator.trim(),value:inputValue==undefined?"":inputValue});
    }
  }
  inputChanges(field,operator,inputValue){
    if(operator==undefined || operator==""){
      alert("Please select criteria condition");
      return;
    }
    if(operator=="Date_is" || operator=="Date_is_NOT" || operator=="Date_is_BEFORE" || operator=="Date_is_AFTER"){
      let latest_date_string =this.datepipe.transform(Date.parse(inputValue), 'yyyy-MM-dd');
      inputValue=latest_date_string;
    }
    this.filterChange.emit({field:field.trim(),operator:operator.trim(),value:inputValue==undefined?"":inputValue});
  }
  onChangeRange(field,operator,event){
    if(operator==undefined || operator==""){
      alert("Please select criteria condition");
      return;
    }
    let value1=event.value;
    let value2=event.highValue;
    this.filterChange.emit({field:field.trim(),operator:operator.trim(),value1:value1,value2:value2});
  }
  onChangeRangeInput(field,operator,value1,value2){
    if(operator==undefined || operator==""){
      alert("Please select criteria condition");
      return;
    }
    this.filterChange.emit({field:field.trim(),operator:operator.trim(),value1:value1,value2:value2});
  }
 
}
