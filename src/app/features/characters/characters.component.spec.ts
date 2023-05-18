import { CharactersComponent } from './characters.component';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import {
  Character,
  CharacterResponse,
  Pagination,
} from 'src/app/shared/interfaces';
import { CharactersService } from 'src/app/features/characters/characters.service';
import { CharacterComponent } from '../../features/characters/character/character.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterByNamePipe } from 'src/app/shared/pipes/filter-by-name.pipe';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let characterService: jasmine.SpyObj<CharactersService>;
  const TEST_RESPONSE: CharacterResponse = {
    info: {} as Pagination,
    results: [{} as Character, {} as Character],
  };
  let el: DebugElement;
  let filterByNamePipe: jasmine.SpyObj<FilterByNamePipe>;

  beforeEach(waitForAsync(() => {
    let characterServiceSpy = jasmine.createSpyObj('CharacterService', [
      'getListOfCharacters',
    ]);

    let filterByNamePipeSpy = jasmine.createSpyObj('FilterByNamePipe', [
      'transform',
    ]);
    filterByNamePipeSpy.transform.and.returnValue(TEST_RESPONSE.results);

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CharactersComponent, CharacterComponent],
      providers: [
        {
          provide: CharactersService,
          useValue: characterServiceSpy,
        },
        {
          provide: FilterByNamePipe,
          useValue: filterByNamePipeSpy,
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CharactersComponent);
        component = fixture.componentInstance;
        characterService = TestBed.inject(
          CharactersService
        ) as jasmine.SpyObj<CharactersService>;
        characterService.getListOfCharacters.and.returnValue(of(TEST_RESPONSE));
        el = fixture.debugElement;
        filterByNamePipe = TestBed.inject(
          FilterByNamePipe
        ) as jasmine.SpyObj<FilterByNamePipe>;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test #getListOfCharacters', () => {
    it('should print a list of characters', () => {
      component.getListOfCharacters(1);
      expect(component.characterList.length).toEqual(2);
    });
  });

  describe('Test pagination', () => {
    it('should increase the current page', () => {
      const btnNext = el.query(By.css('#button-next'));
      btnNext.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.currentPage).toEqual(2);
    });

    it('should decrease the current page', () => {
      component.currentPage = 3;
      fixture.detectChanges();
      const btnNext = el.query(By.css('#button-prev'));
      btnNext.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.currentPage).toEqual(2);
    });

    it('should hide the previous button if the current page is 1', () => {
      component.currentPage = 1;
      fixture.detectChanges();
      let buttonPrev = el.query(By.css('#button-prev'));
      expect(buttonPrev).toBeNull();
    });

    it('should show the previous button if the current page is greather than 1', () => {
      component.currentPage = 2;
      fixture.detectChanges();
      let buttonPrev = el.query(By.css('#button-prev'));
      expect(buttonPrev).toBeTruthy();
    });
  });
});
