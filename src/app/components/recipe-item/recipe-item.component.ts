import { RecipeService } from 'src/app/services/recipe.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: any;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  deleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id);
  }

}
