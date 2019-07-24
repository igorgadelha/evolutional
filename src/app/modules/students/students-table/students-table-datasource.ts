import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import { StudentsService } from '../../../services/students/students.service';
// TODO: Replace this with your own data model type
export interface StudentsTableItem {
  id: number;
	ra: number;
	name: string;
	degreeId: number;
	classId: number;
}
// TODO: replace this with real data from your application
const EXAMPLE_DATA: StudentsTableItem[] = [] = [
  { 'id': 1, 'ra': 12346, 'name': 'Nome do aluno 1', 'degreeId': 1, 'classId': 1 },
  { 'id': 2, 'ra': 456798, 'name': 'Nome do aluno 2', 'degreeId': 2, 'classId': 1 },
  { 'id': 3, 'ra': 752156, 'name': 'Nome do aluno 3', 'degreeId': 3, 'classId': 2 },
  { 'id': 4, 'ra': 852348, 'name': 'Nome do aluno 4', 'degreeId': 4, 'classId': 2 },
  { 'id': 5, 'ra': 454643, 'name': 'Nome do aluno 5', 'degreeId': 6, 'classId': 2 }
];

/**
 * Data source for the StudentsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class StudentsTableDataSource extends DataSource<StudentsTableItem> {
  data: StudentsTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
    // this.data = this.studentsService.all().subscribe();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<StudentsTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: StudentsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: StudentsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

  private addData(data: StudentsTableItem[]) {
    this.data = this.data.concat(data);
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
