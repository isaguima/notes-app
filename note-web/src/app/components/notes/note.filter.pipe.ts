import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteFilter',
})
export class NoteFilterPipe implements PipeTransform {
  transform(items: any[], term: string): any[] {
    if (!items) {
      return [];
    }
    if (!term) {
      return items;
    }

    term = term.toLowerCase();

    return items.filter((item) => {
      return item.title && item.title.toLowerCase().indexOf(term) > -1;
    });
  }
}
