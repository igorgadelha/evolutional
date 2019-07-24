import { Injectable } from '@angular/core';
import { Degree } from '../../interfaces/degree';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DegreesService {
  degrees: Degree[] = [
  	   {
  		   "id":1,
  		   "name":"Ensino Fundamental"
  	   },
  	   {
  		   "id":2,
  		   "name":"1° ano do ensino médio"
  	   },
  	   {
  		   "id":3,
  		   "name":"2° ano ensino médio"
  	   },
  	   {
  		   "id":4,
  		   "name":"3° ano do ensino médio"
  	   },
  	   {
  		   "id":5,
  		   "name":"Cursinho"
  	   },
  	   {
  		   "id":8,
  		   "name":"4º ano do ensino fundamental"
  	   },
  	   {
  		   "id":9,
  		   "name":"5º ano do ensino fundamental"
  	   },
  	   {
  		   "id":10,
  		   "name":"6º ano do ensino fundamental"
  	   },
  	   {
  		   "id":11,
  		   "name":"7º ano do ensino fundamental"
  	   },
  	   {
  		   "id":12,
  		   "name":"8º ano do ensino fundamental"
  	   },
  	   {
  		   "id":13,
  		   "name":"9º ano do ensino fundamental"
  	   },
  	   {
  		   "id":6,
  		   "name":"Estudo em casa"
  	   },
  	   {
  		   "id":7,
  		   "name":"Outros"
  	   }
  ];

  constructor() { }

  all ( ): Observable<Degree[]> {
    return  of(this.degrees);
  }

  total ()  {
    return this.degrees.length;
  }

  get (id:number) {
    return this.degrees[id];
  }
}
