import { TestBed } from '@angular/core/testing';
import { CharactersService } from './characters.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import {
  Character,
  CharacterResponse,
} from 'src/app/shared/interfaces/character';
import { environment } from '../../../environments/environment';

describe('CharactersService', () => {
  let characterService: CharactersService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    characterService = TestBed.inject(CharactersService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(characterService).toBeTruthy();
  });

  describe('Test #getCharacters', () => {
    it('should return a characters response', (donefn) => {
      let testRequest: TestRequest;
      let page: number = 1;
      characterService.getListOfCharacters(page).subscribe({
        next: (characterResponse: CharacterResponse) => {
          expect(characterResponse).toBeTruthy();
          donefn();
        },
      });

      testRequest = httpController.expectOne(
        `${environment.URL_API}/character/?page=${page}`
      );
      expect(testRequest.request.method).toEqual('GET');
      testRequest.flush({
        info: {
          pages: 1,
          prev: undefined,
          next: '',
          count: 0,
        },
        results: [],
      } as CharacterResponse);

      httpController.verify();
    });
  });

  describe('Test #getCharacterById', () => {
    it('should return a character', (donefn) => {
      const URL_PICTURE = '../../../assets/images/profile.jpg';
      const TEST_CHARACTER: Character = {
        id: 0,
        name: 'test character',
        status: 'alive',
        species: 'human',
        type: 'human',
        gender: 'male',
        origin: {
          name: '',
          url: '',
        },
        location: {
          name: 'earth',
          url: '',
        },
        image: URL_PICTURE,
        episode: [],
        url: '',
        created: new Date(),
      };

      let testRequest: TestRequest;
      let characterId: number = 1;
      characterService.getCharacterById(characterId).subscribe({
        next: (character: Character) => {
          expect(character).toBeTruthy();
          expect(character.image).toEqual(URL_PICTURE);
          donefn();
        },
      });

      testRequest = httpController.expectOne(
        `${environment.URL_API}/character/${characterId}`
      );
      expect(testRequest.request.method).toEqual('GET');
      testRequest.flush(TEST_CHARACTER);
      httpController.verify();
    });
  });
});
