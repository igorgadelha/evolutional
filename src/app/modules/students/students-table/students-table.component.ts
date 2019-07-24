import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { StudentsTableDataSource, StudentsTableItem } from './students-table-datasource';
// dialog
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { DialogComponent } from '../dialog/dialog.component';
// interface
import { Student } from '../../../interfaces/student';
// dataTable
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
// icons
import { MatIconModule } from '@angular/material/icon';
// services
import { ClassroomsService } from '../../../services/classrooms/classrooms.service';
import { DegreesService } from '../../../services/degrees/degrees.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Student>;

  @Input() public sharedData: Observable<any>[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'id', 'ra', 'name', 'degreeId', 'classId', 'action' ];
  // variables
  classrooms = [];
  degrees = [];
  constructor(
    private classroomService: ClassroomsService,
    private degreesService: DegreesService,
    private dialog: MatDialog
   ) {}

  ngOnInit() {
    console.log (this.sharedData);
    this.dataSource = new MatTableDataSource<Student>(this.sharedData);
    // this.sharedData.subscribe( data => { this.dataSource.data = data; });
    this.classroomService.all()
      .subscribe( (classroom) => { this.classrooms = classroom });

    this.degreesService.all()
      .subscribe( (degrees) => { this.degrees = degrees; });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  edit (row) {
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

  paged (init, pageSize ) {
    console.log (this.dataSource);
    // this.dataSource.slice ( init * pageSize , (init * pageSize) + pageSize );
  }

  pageChanges (e) {
    console.log (e);
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

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let results = { degree: false, classroom: false, search: false };

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
        if (
          ( searchTerms.degreeId != null && searchTerms.degreeId != '') &&
          ( searchTerms.classId != null && searchTerms.classId != '')
        ) {
          return ( results.degree && results.classroom ) && results.search;
        } else if (
          ( !results.degree || !results.classroom ) &&
          results.search
        ) {
          return ( !results.degree || !results.classroom ) && results.search;
        }
         else {
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

      return filtering(results);

    }

    return filterFunction;
  }

}
