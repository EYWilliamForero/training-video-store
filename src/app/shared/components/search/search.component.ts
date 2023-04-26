import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() description: string = '';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  seacrhByTerms(term: string) {
    this.search.emit(term);
  }
}
