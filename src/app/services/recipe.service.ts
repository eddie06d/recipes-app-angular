import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  URL_BASE: string = environment.URL_API;
  API_KEY: string = environment.API_KEY;
  recipes: any[] = [];

  constructor(private http: HttpClient) { }

  deleteRecipe(id: number): void {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
  }

  getNumRecipesVegan(): number {
    return this.recipes.filter(recipe => recipe.vegan).length;
  }

  getAveragePrice() {
    return (this.recipes.reduce((acc, recipe) => acc + recipe.pricePerServing, 0)/this.recipes.length).toFixed(2);
  }

  getAverageHealthScore() {
    return (this.recipes.reduce((acc, recipe) => acc + recipe.healthScore, 0)/this.recipes.length).toFixed(2);
  }

  getAveragePreparationTime() {
    return (this.recipes.reduce((acc, recipe) => acc + recipe.readyInMinutes, 0)/this.recipes.length).toFixed(2);
  }

  getRecipes() {
    return this.http.get(`${this.URL_BASE}random?apiKey=${this.API_KEY}&number=50`);
  }

  getRecipeById(id: number) {
    return this.http.get(`${this.URL_BASE}${id}/information?apiKey=${this.API_KEY}`);
  }

  searchRecipesByName(name: string) {
    return this.http.get(`${this.URL_BASE}complexSearch?query=${name}&number=12&apiKey=${this.API_KEY}`);
  }

  addRecipe(recipe: any): void {
    this.recipes.push(recipe);
  }

  verifyAddRecipe(id: number): Promise<any> {
    const numVegans = this.getNumRecipesVegan();
    const numNotVegans = this.recipes.length -  numVegans;
    return new Promise((resolve, reject) => {
      this.getRecipeById(id).subscribe({
        next: (recipe: any) => {
          if(this.recipes.length >= 4) resolve({
            message: 'You can only have 4 recipes in your menu',
            available: false
          });
          if(recipe.vegan && numVegans >= 2) resolve({
            message: 'You can only have 2 vegan recipes in your menu',
            available: false
          });
          if(!recipe.vegan && numNotVegans >= 2) resolve({
            message: 'You can only have 2 non-vegan recipes in your menu',
            available: false
          });
          resolve({
            recipe,
            available: true
          });
        },
        error: (err) => reject(err)
      });
    });
  }

}
