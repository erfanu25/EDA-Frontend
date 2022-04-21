import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, SelectItem} from "primeng/api";
import {ThemePalette} from "@angular/material/core";
import { EmpDetails, TableType } from '../../domain/data-analysis.domain';
@Component({
  selector: 'app-criteria-add',
  templateUrl: './criteria-add.component.html',
  styleUrls: ['./criteria-add.component.css']
})
export class CriteriaAddComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
  }

}
