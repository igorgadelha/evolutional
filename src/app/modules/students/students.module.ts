import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// routing
import { StudentsRoutingModule } from './students-routing.module';
// components
import { StudentComponent } from './student/student.component';
import { StudentsTableComponent } from './students-table/students-table.component';
import { DialogComponent } from './dialog/dialog.component';
import { StudentChartsComponent } from './student-charts/student-charts.component';
// material angular
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
// dialog
import { MatDialogModule } from "@angular/material";
// reactiveForm
import { ReactiveFormsModule } from '@angular/forms';
// tabs
import { MatTabsModule } from '@angular/material/tabs';
// services
import { StudentsService } from '../../services/students/students.service';
import { ClassroomsService } from '../../services/classrooms/classrooms.service';
import { DegreesService } from '../../services/degrees/degrees.service';
// table
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
// charts
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    StudentComponent,
    StudentsTableComponent,
    DialogComponent,
    StudentChartsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
    GoogleChartsModule.forRoot({})
  ],
  providers: [
    StudentsService,
    ClassroomsService,
    DegreesService
  ],
  entryComponents:[
    DialogComponent,
    StudentChartsComponent,
    StudentsTableComponent
  ]
})
export class StudentsModule { }
