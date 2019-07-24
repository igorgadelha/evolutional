import { Injectable } from '@angular/core';
// import { CLASSROOM } from './mock-classroom';
import { Classroom } from '../../interfaces/classroom';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService {
  classrooms: Classroom[] = [
   {'id':1,'name':'A'},
   {'id':2,'name':'B'},
   {'id':3,'name':'C'},
   {'id':4,'name':'D'},
   {'id':5,'name':'E'},
   {'id':6,'name':'F'}
 ];

  constructor() {
    console.log (this.classrooms);
  }

  all ( ): Observable<Classroom[]> {
    return  of(this.classrooms);
  }

  add ( item ): void  {
    this.classrooms.push(item);
  }

  total ()  {
    return this.classrooms.length;
  }

  get (id:number) {
    return this.classrooms[id];
  }
}
