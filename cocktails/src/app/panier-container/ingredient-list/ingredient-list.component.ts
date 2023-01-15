import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/interfaces/ingredient.interface';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
})
export class IngredientListComponent implements OnInit {
  @Input() public ingredients: Ingredient[] | null = null;

  constructor() {}

  ngOnInit() {}
}


