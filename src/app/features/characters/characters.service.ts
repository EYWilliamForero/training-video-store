import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Character,
  CharacterResponse,
} from 'src/app/shared/interfaces/character';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private URL_API = environment.URL_API;

  constructor(private http: HttpClient) {}

  getListOfCharacters(page: number): Observable<CharacterResponse> {
    const urlCharacters: string = `${this.URL_API}/character/?page=${page}`;
    return this.http.get<CharacterResponse>(urlCharacters);
  }

  getCharacterById(id: number): Observable<Character> {
    const urlCharacterById: string = `${this.URL_API}/character/${id}`;
    return this.http.get<Character>(urlCharacterById);
  }
}
