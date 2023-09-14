import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {



@Input()
public placeholder: string = '';


@Output()
public OnValue = new EventEmitter<string>();

public emitValue( value:string ):void{
  
    this.OnValue.emit ( value );

}



}
