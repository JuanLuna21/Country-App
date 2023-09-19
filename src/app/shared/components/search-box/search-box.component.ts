import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit{

  private debouncer: Subject<string> = new Subject<string>();
  
  
  @Input()
  public placeholder: string = '';
  
  
  @Output()
  public OnValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();


  ngOnInit(): void {
   this.debouncer.pipe(debounceTime(300)).subscribe( value =>{
      this.onDebounce.emit( value );
   })
  }


public emitValue( value:string ):void{  
    this.OnValue.emit ( value );
}

onKeyPress( searchTerm: string){
  this.debouncer.next(searchTerm);
}


}
