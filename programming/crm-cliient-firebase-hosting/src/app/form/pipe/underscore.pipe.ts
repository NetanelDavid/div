import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'underscore'
})
export class UnderscorePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value}`.split('_').join(' ');
  }

}
