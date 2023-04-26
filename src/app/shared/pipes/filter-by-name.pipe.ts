import { Pipe, PipeTransform } from '@angular/core';
import { Searchable } from '../interfaces/searchable';

@Pipe({
  name: 'filterByName',
})
export class FilterByNamePipe implements PipeTransform {
  transform(data: Searchable[], query: string): unknown {
    if (query == '' || query == undefined) {
      return data;
    }
    return data.filter(
      (obj) => obj.name.toLowerCase().indexOf(query.toLowerCase()) != -1
    );
  }
}
