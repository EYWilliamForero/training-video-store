import { Component, Input } from '@angular/core';
import { Character } from 'src/app/shared/interfaces/character';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent {
  @Input() character?: Character;
}
