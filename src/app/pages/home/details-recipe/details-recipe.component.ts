import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-details-recipe',
  templateUrl: './details-recipe.component.html',
  styleUrls: ['./details-recipe.component.css']
})
export class DetailsRecipeComponent implements OnInit {
  recipe: any = {};
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe(params => {
      this.recipeService.getRecipeById(params['id']).subscribe({
        next: (data) => this.recipe = data,
        error: (err) => console.log(err),
        complete: () => this.isLoading = false
      });
    })
  }

  fillSummary(summary: string): void{
    let paragraph = document.querySelector('#sum')!;
    paragraph.innerHTML = summary;
  }

}
