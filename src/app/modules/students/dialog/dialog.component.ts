import { Component, OnInit, Inject } from '@angular/core';
// Dialog
import {MatDialog, MatDialogConfig} from "@angular/material";
import { MAT_DIALOG_DATA } from '@angular/material';
// form
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// services
import { ClassroomsService } from '../../../services/classrooms/classrooms.service';
import { DegreesService } from '../../../services/degrees/degrees.service';
import { StudentsService } from '../../../services/students/students.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  student;
  classrooms = [];
  degrees = [];

  constructor(
    private studentService: StudentsService,
    private classroomService: ClassroomsService,
    private degreesService: DegreesService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }


  ngOnInit() {
    this.classroomService.all()
      .subscribe( (classroom) => { this.classrooms = classroom; });

    this.degreesService.all()
      .subscribe( (degrees) => { this.degrees = degrees; });

    this.form = this.formBuilder.group({
        name: [this.data.name, Validators.required],
        ra: [{value: this.data.ra, disabled: true}, Validators.required],
        classId: [this.data.classId, [Validators.required]],
        degreeId: [this.data.degreeId, [Validators.required]]
    });
  }

  onSubmit() {
    this.form.value.id = this.data.id;
    this.studentService.edit(this.form.value);
  }

}
