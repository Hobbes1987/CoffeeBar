import { Status } from './objects/order';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusName'
})
export class StatusNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == Status.Pending)
      return "In de wachtrij";
    else if (value == Status.Preparing)
      return "Wordt klaargemaakt";
    else if(value == Status.Ready)
      return "Bestelling gereed";
    else if(value == Status.Delivered)
      return "Afgehaald";  
    else
      return "onbekende status";
  }

}
