import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matter } from '../../interfaces/matter';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MattersService {
  matters: Matter[] = [];
  constructor( private http: HttpClient ) { }

  get( id: number ) {
    return this.http.get<Matter>('matters/${id}').pipe(
      map(
        matter => {
          return matter
        }
      ),
    );
  }
}
