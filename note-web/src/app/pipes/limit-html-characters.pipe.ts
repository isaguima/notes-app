import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para limitar o texto em um determinado número de caracteres
 * e permitir o uso de tags HTML.
 */
@Pipe({
  name: 'limitHtmlCharacters'
})
export class LimitHtmlCharactersPipe implements PipeTransform {

  transform(value: any, arg?: any): any {
    let maxLength = arg ? Number(arg) : 100;
    let truncatedText = value.trim().slice(0, maxLength);
    let sufix = '';
    if (value.length > maxLength) {
      sufix = '...';
    }


    return `${truncatedText}${sufix}`;
  }
}
