import { SearchComponent } from './pages/search/search.component';
import { DetailsRecipeComponent } from './pages/home/details-recipe/details-recipe.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MenuComponent } from './pages/home/menu/menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: '', component: MenuComponent },
    { path: 'recipe/:id', component: DetailsRecipeComponent },
    { path: 'search', component: SearchComponent }
  ] },
  { path: '**', redirectTo: 'signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
