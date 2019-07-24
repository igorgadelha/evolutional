import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
// services
import { StudentsService } from '../../../services/students/students.service';
import { ClassroomsService } from '../../../services/classrooms/classrooms.service';
import { DegreesService } from '../../../services/degrees/degrees.service';

import { Student } from '../../../interfaces/student';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { MatIconModule } from '@angular/material/icon';

import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements AfterViewInit, OnInit {
  students = [];
  classrooms = [];
  degrees = [];
  dataSource;
  sharedData;
  chartData: any[] = [];

  filter: Student = {
    id: 0,
    ra: 0,
    name: '',
    degreeId: 0,
    classId: 0
  };

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Student>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'id', 'ra', 'name', 'degreeId', 'classId', 'action' ];

  constructor(
    private studentService: StudentsService,
    private classroomService: ClassroomsService,
    private degreesService: DegreesService,
    private dialog: MatDialog
   ) {}

  ngOnInit() {
      this.loadData();
      this.classroomService.all()
        .subscribe(
          (classroom) => {
            this.classrooms = classroom;
        });

      this.degreesService.all()
        .subscribe(
          (degrees) => {
            this.degrees = degrees;

            let studentsDegrees = this.studentService.getStudentsDegrees();
            for ( let degree of degrees ) {
              if (typeof studentsDegrees[ degree.id ] == 'undefined') {
                studentsDegrees[ degree.id ] = 0;
              }
              this.chartData.push([ degree.name, studentsDegrees[ degree.id ] ]);
            }
        });

  }
  updateChart () {
    this.degreesService.all()
      .subscribe(
        (degrees) => {
          this.degrees = degrees;

          let studentsDegrees = this.studentService.getStudentsDegrees();
          let values = [];
          for ( let degree of degrees ) {
            if (typeof studentsDegrees[ degree.id ] == 'undefined') {
              studentsDegrees[ degree.id ] = 0;
            }
            values.push([ degree.name, studentsDegrees[ degree.id ] ]);
          }
          this.chartData = values;
          console.log (this.chartData);
          return this.chartData;
      });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  loadData () {
    this.studentService.all().subscribe(
      data => {
        this.students = data;
        this.sharedData = data;
        this.dataSource = new MatTableDataSource<Student>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.createFilter();
      }
    );
 }
  paged (init, pageSize ) {
    console.log (this.dataSource);
    // this.dataSource.slice ( init * pageSize , (init * pageSize) + pageSize );
  }

  pageChanges (e) {
    console.log (e);
  }

  applyFilter(filterValue: string) {
    this.filter.name = filterValue.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filter);
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterDegree ( filterValue ) {
    this.filter.degreeId = filterValue.value.id;
    this.dataSource.filter = JSON.stringify(this.filter);
    // this.dataSource.filter = filterValue.value.id.toString();
  }

  filterClassroom ( filterValue ) {
    this.filter.classId = filterValue.value.id;
    this.dataSource.filter = JSON.stringify(this.filter);
    // this.dataSource.filter = filterValue.value.id.toString();
  }

  addStudents () {
    this.studentService.getNames(300)
      .subscribe(
        (students) => {
          // update data in data source when available
          this.studentService.all().subscribe(
            data => {
              this.students = data;
              this.sharedData = data;
              this.dataSource.data = data;

              this.updateChart();
            }
          );
      });
  }

  filterClasroomColumn (id) {
    let filter = this.classrooms.filter(classroom => {
      return classroom.id == id;
    });

    return filter[0].name;
  }

  filterDegreeColumn (id) {
    let filter = this.degrees.filter(degree => {
      return degree.id == id;
    });
    return filter[0].name;
  }

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let results = {
        degree: false,
        classroom: false,
        search: false
      };

      let classId = () => {
         return data.classId == searchTerms.classId ? true : false;
      };

      let degreeId = () => {
        return data.degreeId == searchTerms.degreeId ? true : false;
      };

      let nameSearch = () => {
        let found = false;
          searchTerms.name.trim().toLowerCase().split(' ').forEach(word => {
            if (data.name.toLowerCase().indexOf(word) != -1) { found = true }
          });

        return found;
      }

      let filtering = ( results: any )  => {
        if ( searchTerms.degreeId != '' && searchTerms.classId != '') {
          return ( results.degree && results.classroom ) && results.search;
        } else {
          return ( results.degree || results.classroom ) && results.search;
          }
      }

      if ( searchTerms.classId != null && searchTerms.classId != '') {
        results.classroom = classId();
      }
      if ( searchTerms.degreeId != null && searchTerms.degreeId != '') {
        results.degree = degreeId();
      }
      results.search = nameSearch();
      console.log (data, searchTerms, results);

      return filtering(results);

    }

    return filterFunction;
  }

  edit (row) {
    console.log (row);
    this.openDialog(row);
  }

  openDialog(data) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialog = this.dialog.open(DialogComponent, { data: data, });

    dialog.afterClosed().subscribe(result => {
      // update data in data source when available
      this.studentService.all().subscribe(
        data => {
          this.students = data;
          this.dataSource.data = data;
        }
      );
    });
  }

}
