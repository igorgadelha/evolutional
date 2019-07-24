import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../../interfaces/teacher';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  teacher : Teacher[] = [];

  constructor( private http: HttpClient ) { }

  get( id: number ) {
    return this.http.get<Teacher>('teacher/${id}').pipe(
      map(
        teacher => {
          return teacher
        }
      )
    );
  }
}
