import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter  } from '@angular/core';
// services
import { StudentsService } from '../../../services/students/students.service';
import { ClassroomsService } from '../../../services/classrooms/classrooms.service';
import { DegreesService } from '../../../services/degrees/degrees.service';
// interfaces
import { Student } from '../../../interfaces/student';
// chart
import * as d3 from 'd3';

@Component({
  selector: 'app-student-charts',
  templateUrl: './student-charts.component.html',
  styleUrls: ['./student-charts.component.scss'],
})
export class StudentChartsComponent implements OnInit {
  // Data
  dataSource: [] = [];
  myChartData;
  BarChart = 'PieChart';
  dynamicResize = true;
  cols: [] = ['Degrees', 'Students By Degree'];
  @Input() public chartData: Observable<any>[];
  constructor(
      private studentService: StudentsService,
      private classroomService: ClassroomsService,
      private degreesService: DegreesService,
    ) {

  }

  ngOnInit() {
  }
}
