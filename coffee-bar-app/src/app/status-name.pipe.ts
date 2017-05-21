import { Status } from './objects/order';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusName'
})
export class StatusNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == Status.Pending)
      return "Bestelling nog in de wachtrij";
    else if (value == Status.Preparing)
      return "Bestelling wordt klaargemaakt";
    else if(value == Status.Ready)
      return "Bestelling gereed";
    else if(value == Status.Delivered)
      return "Bestelling is afgehaald";  
    else if(value == Status.Cancelled)
      return "Geannuleerd";  
    else
      return "onbekende status";
  }

}
