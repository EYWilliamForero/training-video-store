import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character } from 'src/app/shared/interfaces/character';
import { CharactersService } from 'src/app/features/characters/characters.service';
import { CharacterResponse } from 'src/app/shared/interfaces/character';
import { FilterByNamePipe } from 'src/app/shared/pipes/filter-by-name.pipe';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent {
  pageObserver: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  page$: Observable<number> = this.pageObserver.asObservable();
  currentPage: number = 0;
  characterList: Character[] = [];
  characterListFiltered: Character[] = [];

  constructor(
    private characterService: CharactersService,
    private filterByNamePipe: FilterByNamePipe
  ) {}

  ngOnInit(): void {
    //TODO: Traer una lista completa de 20 caracteres por parametro
    //Renderizar cada characcter en su componente
    //Mostrar en una grilla los carateres que sea responsive
    //Pruebas unitarias de los compoentes que tengamos

    this.subscribeToPaginationStatus();
  }

  subscribeToPaginationStatus() {
    this.page$.subscribe({
      next: (newPage) => {
        this.currentPage = newPage <= 0 ? 1 : newPage;
        this.getListOfCharacters(newPage);
      },
    });
  }

  getListOfCharacters(page: number) {
    this.characterService.getListOfCharacters(page).subscribe({
      next: (characterResponse: CharacterResponse) => {
        this.characterList = characterResponse.results;
        this.characterListFiltered = this.characterList;
      },
    });
  }

  nextPage() {
    this.currentPage++;
    this.pageObserver.next(this.currentPage);
  }

  previousPage() {
    this.currentPage--;
    this.pageObserver.next(this.currentPage);
  }

  searchByName(name: string = '') {
    this.characterListFiltered = this.filterByNamePipe.transform(
      this.characterList,
      name
    ) as Character[];
  }
}
