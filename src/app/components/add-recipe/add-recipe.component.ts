import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { ItemInRecipeDTO } from 'src/DTOs/ItemInRecipeDTO';
import { RecipeDTO } from 'src/DTOs/RecipeDTO';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  newItemInRecipe = {} as ItemInRecipeDTO
  newRecipe = {} as RecipeDTO
  newRecipeName: string = ''
  newRecipeImage: string = ''
  newRecipeIngredients: number[] = []
  newRecipeSteps: string = ''
  newItemInRecipeWeightArr: number[] = []
  recipeCreated: boolean = false
  recipeId: number = 0

  constructor(public ui: UiService) {}

  findName(itemId: number): string | undefined {
    for(let item of this.ui.itemUnits){
      if(item.id === itemId){
        return item.name
      }
    }
    return
  }
  createRecipe() {
    this.newRecipe = {
      name: this.newRecipeName,
      image: this.newRecipeImage,
      ingredientIds: [],
      steps: this.newRecipeSteps,
      userId: this.ui.currentUser?.id ? this.ui.currentUser.id : 0
    }
    this.ui.addRecipe(this.newRecipe)
    this.recipeCreated = true;
  }
  createItemsInRecipe() {
    //need to get the recipe id from ui.recipes
    for(let recipe of this.ui.recipes){
      if(recipe.name === this.newRecipeName && recipe.image === this.newRecipeImage){
        this.recipeId = recipe.id
      }
    }

    for(let itemId of this.newRecipeIngredients){
      this.newItemInRecipe = {
        itemId: itemId,
        weightNeeded: this.newItemInRecipeWeightArr[itemId],
        recipeId: this.recipeId
      }
      this.ui.addItemInRecipe(this.newItemInRecipe)
    }

    //update the recipe values
    for(let ingredient of this.ui.itemInRecipes){
      if(ingredient.recipe.name === this.newRecipeName && ingredient.recipe.image === this.newRecipeImage){
        this.newRecipe.ingredientIds.push(ingredient.id)
      }
    }
    this.newRecipe.steps = this.newRecipeSteps
    this.ui.updateRecipe(this.recipeId, this.newRecipe)
  }
}