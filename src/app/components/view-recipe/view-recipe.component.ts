import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { AppUser } from 'src/data/AppUser';
import { ItemInRecipe } from 'src/data/ItemInRecipe';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnDestroy {
  recipeName: string = ''
  recipeImage: string = ''
  recipeIngredients: ItemInRecipe[] = []
  recipeSteps: string = ''
  recipeUser = {} as AppUser
  private recipesSubscription: Subscription
  totalWeightAvailableInPantry: number = 0
  totalWeightAfterRecipe: number = 0
  newPantryQuantity: number = 0
  thisItemInRecipeIds: number[] = []

  constructor(public ui: UiService) {
    this.ui.loadRecipes()
    this.recipesSubscription = ui.whenRecipesUpdates().subscribe(recipes => {
    for(let recipe of recipes){
      if(recipe.id===this.ui.recipeIdToView){
        this.recipeName = recipe.name
        this.recipeImage = recipe.image
        this.recipeIngredients = recipe.ingredients
        this.recipeSteps = recipe.steps
        this.recipeUser = recipe.user
      }
    }
    })
  }
  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe()
  }
  recipeMade(){
    for(let ingredient of this.recipeIngredients){
        this.totalWeightAvailableInPantry = ingredient.item.weightPerUnit * ingredient.item.pantryQuantity
        this.totalWeightAfterRecipe = this.totalWeightAvailableInPantry - ingredient.weightNeeded
        this.newPantryQuantity = this.totalWeightAfterRecipe / ingredient.item.weightPerUnit

        for(let item of ingredient.item.thisItemInRecipes){
          this.thisItemInRecipeIds.push(item.id)
        }

        this.ui.updateItemUnit(ingredient.item.id, {
          name: ingredient.item.name,
          image: ingredient.item.image,
          weightPerUnit: ingredient.item.weightPerUnit,
          caloriesPerUnit: ingredient.item.caloriesPerUnit,
          pantryQuantity: this.newPantryQuantity,
          pantryId: ingredient.item.pantry.id,
          thisItemInRecipeIds: this.thisItemInRecipeIds
        })
    }
  }
}
