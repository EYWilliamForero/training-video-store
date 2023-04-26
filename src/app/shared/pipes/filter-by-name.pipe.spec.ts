import { Searchable } from '../interfaces/searchable';
import { FilterByNamePipe } from './filter-by-name.pipe';
import { SEARCHABLE_LIST } from 'src/mock';

describe('FilterByNamePipe', () => {
  let pipe: FilterByNamePipe;
  beforeEach(() => {
    pipe = new FilterByNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter a list searchable ignore upper and lowwer cases', () => {
    let query: string = 'CaM';
    let dataFiltered: Searchable[] = pipe.transform(
      SEARCHABLE_LIST,
      query
    ) as Searchable[];
    expect(dataFiltered).toBeTruthy();
    expect(dataFiltered.length).toEqual(2);
  });

  it('should filter a list searchable ignore upper characters', () => {
    let query: string = 'WILLY';
    let dataFiltered: Searchable[] = pipe.transform(
      SEARCHABLE_LIST,
      query
    ) as Searchable[];
    expect(dataFiltered).toBeTruthy();
    expect(dataFiltered.length).toEqual(1);
  });

  it('should return the same list if there is not a query defined', () => {
    let query: string = '';
    let dataFiltered: Searchable[] = pipe.transform(
      SEARCHABLE_LIST,
      query
    ) as Searchable[];
    expect(dataFiltered).toBeTruthy();
    expect(dataFiltered.length).toEqual(SEARCHABLE_LIST.length);
  });
});
