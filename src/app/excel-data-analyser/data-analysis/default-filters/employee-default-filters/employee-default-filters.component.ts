import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-employee-default-filters',
  templateUrl: './employee-default-filters.component.html',
  styleUrls: ['./employee-default-filters.component.css']
})

export class EmployeeDefaultFiltersComponent implements OnInit {
 
  @Output() filterListChange = new EventEmitter<any>();
  expand:boolean=true;
  email:string;
  @Input('expand') set expandValue(data) {
    if (data) {
      this.expand = data;
    }
  }
  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'**************/
     this.expand=!this.expand;

    } 
  minValue: number = 10;
  maxValue: number = 150;
  options: Options = {
    floor: 0,
    ceil: 150,
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
  constructor() { }

  ngOnInit(): void {
    this.expand=true;
    this.email="";

  }

  onClick(){
    let advanceFilterList=[];
    let objEmail={field:"email",operator:"Contains",value:this.email.trim()};
    let objAge={field:"age",operator:"Number_Range",value1:this.minValue,value2:this.maxValue};
    advanceFilterList.push(objEmail);
    advanceFilterList.push(objAge);
    this.filterListChange.emit(advanceFilterList);
  }
  

}
