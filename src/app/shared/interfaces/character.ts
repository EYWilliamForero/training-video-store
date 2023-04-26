import { Pagination } from './pagination';
import { Searchable } from './searchable';

export interface Character extends Searchable {
  id: number;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface CharacterResponse {
  info: Pagination;
  results: Character[];
}
