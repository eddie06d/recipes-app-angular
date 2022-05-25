import { RecipeService } from 'src/app/services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: FormControl = new FormControl('');
  isLoading: boolean = false;
  results?: any[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      map(search => search.toLowerCase().trim()),
      debounceTime(500),
      distinctUntilChanged(),
      filter(search => search.length > 2),
      tap(search => {
        this.isLoading = true;
        this.recipeService.searchRecipesByName(search).subscribe((res: any) => {
        this.results = res.results;
        this.isLoading = false;
      })})
    ).subscribe();
  }

  addRecipeToMenu(id: number) {
    this.recipeService.verifyAddRecipe(id).then((res: any) => {
      if(!res.available) {
        Swal.fire({
          title: 'Error',
          text: res.message,
          icon: 'error'
        });
      }else {
        this.recipeService.addRecipe(res.recipe);
        Swal.fire({
          title: 'Success',
          text: 'Recipe added to menu',
          icon: 'success'
        });
      }
    });
  }

}
