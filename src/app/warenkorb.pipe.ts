import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'warenkorb'
})
export class WarenkorbPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
