import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], search: string = ''): any[] {
    if (!search.trim()) {
      return items;
    }

    return items.filter(item => {

      return item.name.toLowerCase().includes(search);

    });
  }
}
