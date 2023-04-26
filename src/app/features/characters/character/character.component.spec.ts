import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Character } from 'src/app/shared/interfaces/character';
import { CharacterComponent } from './character.component';

describe('CharacterComponent', () => {
  let characterComponent: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let el: DebugElement;
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CharacterComponent);
        characterComponent = fixture.componentInstance;
        el = fixture.debugElement;
        characterComponent.character = TEST_CHARACTER;
        fixture.detectChanges();
      });
  }));

  it('should create a character component', () => {
    expect(characterComponent).toBeTruthy();
  });

  describe('Test visual component', () => {
    it("should show the character's image", () => {
      let characterImage: DebugElement = el.query(
        By.css('.container-card-section-img')
      );
      expect(characterImage).toBeTruthy();
      expect(characterImage.nativeNode.attributes.src.nodeValue).toEqual(
        URL_PICTURE
      );
    });

    it("should show the character's name", () => {
      let characherName: DebugElement = el.query(By.css('#character-name'));
      expect(characherName).toBeTruthy();
      expect(characherName.nativeNode.innerText).toEqual(TEST_CHARACTER.name);
    });

    it("should show the character's specie", () => {
      let characherSpecie: DebugElement = el.query(By.css('#character-specie'));
      expect(characherSpecie).toBeTruthy();
      expect(characherSpecie.nativeNode.innerText).toEqual(
        TEST_CHARACTER.species
      );
    });
  });
});
