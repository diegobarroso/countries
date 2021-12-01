import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  @Input() placeholder: string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  
  debouncer: Subject<string> = new Subject();
  
  term: string = '';
  
  ngOnInit(){
    this.debouncer
      .pipe(debounceTime(500))
      .subscribe(value => {        
        this.onDebounce.emit(value)
      });
  }
  search() {
    this.onEnter.emit(this.term);
  }

  keyPressed() {
    this.debouncer.next(this.term);
  }

}
