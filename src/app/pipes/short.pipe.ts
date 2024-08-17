import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short'
})
export class ShortPipe implements PipeTransform {
  private textLength:number=100;
  transform(value: string): string {
    if (value.length>this.textLength) {
      return value.slice(0,this.textLength)+'...';
    }else{
      return value;
    }
  }

}
