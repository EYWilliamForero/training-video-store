import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from './characters.component';
import { CharacterComponent } from './character/character.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterByNamePipe } from 'src/app/shared/pipes/filter-by-name.pipe';

@NgModule({
  declarations: [CharactersComponent, CharacterComponent],
  providers: [FilterByNamePipe],
  imports: [CommonModule, CharactersRoutingModule, SharedModule],
})
export class CharactersModule {}
