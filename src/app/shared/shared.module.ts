import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';

@NgModule({
  declarations: [SearchComponent, FilterByNamePipe],
  imports: [CommonModule],
  exports: [SearchComponent, FilterByNamePipe],
})
export class SharedModule {}
