import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchTerm: string = ''): any[] {
    if (searchTerm.trim()) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(item => {

      return Object.keys(item).some(key =>
        item[key].toLowerCase().includes(searchTerm)
      );
    });
  }
}
