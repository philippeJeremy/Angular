import { Pipe, PipeTransform } from '@angular/core';
import { Cocktail } from '../interfaces/cocktail.interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(cocktails: Cocktail[] | null, search: string): Cocktail[] | null {
    return cocktails
      ? cocktails.filter((cocktail) =>
          cocktail.name.toLowerCase().includes(search.toLowerCase())
        ) : null
  }
}
