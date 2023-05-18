import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    SearchComponent,
    FilterByNamePipe,
    NotFoundComponent,
    LoaderComponent,
  ],
  imports: [CommonModule],
  exports: [
    SearchComponent,
    FilterByNamePipe,
    NotFoundComponent,
    LoaderComponent,
  ],
})
export class SharedModule {}
