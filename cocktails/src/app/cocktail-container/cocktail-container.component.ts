import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Cocktail } from '../shared/interfaces/cocktail.interface';
import { CocktailService } from '../shared/services/cocktail.service';

@Component({
  selector: 'app-cocktail-container',
  templateUrl: './cocktail-container.component.html',
  styleUrls: ['./cocktail-container.component.scss'],
})
export class CocktailContainerComponent {
  public cocktails$: Observable<Cocktail[] | []> =
    this.cocktailService.cocktails$;

  constructor(private cocktailService: CocktailService) {}
}

