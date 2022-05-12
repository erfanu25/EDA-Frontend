import { DataMappingService } from '../services/data-mapping.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { EventEmitter } from 'stream';


@Component({
  selector: 'mapping-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['../data-mapping.component.css']
})
export class DialogComponent implements OnInit {
  //private tableList: string[] = []


  constructor( public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  form: FormGroup;

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.form = new FormGroup({
      mapperName: new FormControl('', [Validators.maxLength(20), Validators.required]),
      });
  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }


}
