import { RecipeService } from 'src/app/services/recipe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    public recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    if(this.recipeService.recipes.length == 0) {
      this.isLoading = true;
      this.recipeService.getRecipes().subscribe({
        next: (data: any) => {
          const recipes = [];
          let countVegan = 0;
          let countNotVegan = 0;
          for(const recipe of data.recipes) {
            if(recipe.vegan) {
              countVegan++;
              recipes.push(recipe);
              if(countVegan == 2) break;
            }
          }
          for(const recipe of data.recipes) {
            if(!recipe.vegan) {
              countNotVegan++;
              recipes.push(recipe);
              if(countNotVegan == 2) break;
            }
          }
          this.recipeService.recipes = recipes;
          this.isLoading = false;
        },
        error: (err) => console.log(err)
      });
    }
  }

  get averagePrice() {
    return this.recipeService.getAveragePrice();
  }

  get averageHealthScore() {
    return this.recipeService.getAverageHealthScore();
  }

  get averagePreparationTime() {
    return this.recipeService.getAveragePreparationTime();
  }

  deleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id);
  }

}
