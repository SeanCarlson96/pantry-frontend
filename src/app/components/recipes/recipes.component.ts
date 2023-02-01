import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { AppUser } from 'src/data/AppUser';
import { Recipe } from 'src/data/Recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnDestroy {
  ui: UiService
  public newRecipe: boolean = false
  public viewRecipe: boolean = false
  public editRecipeId: number = -1
  public displayedColumns: string[] = ['image', 'name', 'View', 'Edit', 'Delete' ];
  public dataSource: Recipe[] = []
  private recipesSubscription: Subscription
  public data: Recipe[] = []
  public usersDropdown: AppUser[] = []

  constructor(ui:UiService){
    this.ui = ui
    ui.loadRecipes()
    this.dataSource = []
    this.recipesSubscription = ui.whenRecipesUpdates().subscribe(recipes => {
      if(this.ui.currentUser?.id===undefined){
        this.dataSource = []
      } else if(this.data = []){
        for(let i = 0; i < recipes.length; i++){
          if(recipes[i].user.id === this.ui.currentUser?.id){
            this.data.push(recipes[i])
          }
        }
        this.dataSource = this.data
      }
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
    this.ui.editRecipeId = id
  }
}
