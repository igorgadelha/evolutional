import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from './student';
import { ClassroomsService } from '../classrooms/classrooms.service';
import { DegreesService } from '../degrees/degrees.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  degree = [];
  classroom = [];
  students: Student[] = [
    { 'id': 1, 'ra': 12346,  'name': 'Nome do aluno 1', 'degreeId': 1, 'classId': 1 },
    { 'id': 2, 'ra': 456798, 'name': 'Nome do aluno 2', 'degreeId': 2, 'classId': 1 },
    { 'id': 3, 'ra': 752156, 'name': 'Nome do aluno 3', 'degreeId': 3, 'classId': 2 },
    { 'id': 4, 'ra': 852348, 'name': 'Nome do aluno 4', 'degreeId': 4, 'classId': 2 },
    { 'id': 5, 'ra': 454643, 'name': 'Nome do aluno 5', 'degreeId': 6, 'classId': 2 }
  ];

  constructor(
    private http: HttpClient,
    private classroomService: ClassroomsService,
    private degreesService: DegreesService
  ) {
    this.countDefault();
   }

  countDefault () {
    for (let student of this.students ) {
      this.countDegrees(student);
      this.countClassroom(student);
    }
  }

  countDegrees ( student ) {
    if ( typeof this.degree[student.degreeId] == 'undefined' ) {
      this.degree[ student.degreeId ] = 1;
    } else {
      this.degree[ student.degreeId ] = this.degree[ student.degreeId ] + 1;
    }
  }

  countClassroom ( student ) {
    if ( typeof this.classroom[ student.classId ] == 'undefined' ) {
      this.classroom[ student.classId ] = 1;
    } else {
      this.classroom[ student.classId ] = this.classroom[ student.classId ] + 1;
    }
  }

  getStudentsDegrees() {
    return this.degree;
  }

  getStudentsClassroom() {
    return this.classroom;
  }

  getNames (total) {

    return this.http.get( 'https://uinames.com/api/?amount=' + total ).pipe (
      map (
        res => {
           for ( let r of res ) {
            let student: Student = {
              'id': this.total() + 1,
              'name' : r.name + ' ' + r.surname,
              'ra' : Math.random(),
              'degreeId' : this.degreesService.get( Math.floor( Math.random() * this.degreesService.total() ) ).id,
              'classId' : this.classroomService.get( Math.floor( Math.random() * this.classroomService.total() ) ).id
            };
            this.students.push( student );
            this.countDegrees ( student );
            this.countClassroom ( student );
          }
        }
      )
    )
  }
  all ( ): Observable<Student[]> {
    console.log (of(this.students).value);
    return  of(this.students).pipe(map(students => { return students }));
  }

  add ( item ): void  {
    this.students.push(item);
  }

  edit ( student: Student )  {
    console.log (student);
   let index = this.students.findIndex( std => std.id == student.id );
     console.log (index);
     if ( index >= 0 ) {
       this.students[index] = student;
       return true;
     } else {
       return false;
     }


  }

  total ()  {
    return this.students.length;
  }
}
