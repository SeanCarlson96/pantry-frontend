import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Recipe } from 'src/data/Recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  ui: UiService
  public newRecipe: boolean = false
  public viewRecipe: boolean = false
  public editRecipeId: number = -1
  public displayedColumns: string[] = ['image', 'name', 'View', 'Edit', 'Delete' ];
  public dataSource: Recipe[] = []
  private recipesSubscription: Subscription

  constructor(ui:UiService){
    this.ui = ui
    ui.loadRecipes()
    this.recipesSubscription = ui.whenRecipesUpdates().subscribe(recipes => {
      this.dataSource = recipes
    })
  }
  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe()
  }
  openRecipeView(id: number) {
    this.ui.recipeIdToView = id
    localStorage.setItem("recipeIdToView", id.toString());
    this.ui.setPage('view-recipe')
  }
  openRecipeEdit(id: number) {
    this.ui.recipeIdToEdit = id
    this.editRecipeId = id
  }
}
