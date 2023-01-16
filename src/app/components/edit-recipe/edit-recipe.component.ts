import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { ItemInRecipeDTO } from 'src/DTOs/ItemInRecipeDTO';
import { RecipeDTO } from 'src/DTOs/RecipeDTO';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent {
  editItemInRecipe = {} as ItemInRecipeDTO
  editRecipe = {} as RecipeDTO
  editRecipeName: string = ''
  editRecipeImage: string = ''
  editRecipeIngredients: number[] = []
  editRecipeSteps: string = ''
  editItemInRecipeWeightArr: number[] = []
  recipeNameImageEdited: boolean = false
  recipeId: number = 0
  editItemInRecipeId: number = 0

  constructor(public ui: UiService) {
    for(let recipe of ui.recipes) {
      if(recipe.id === ui.recipeIdToEdit){
        this.editRecipeName = recipe.name
        this.editRecipeImage = recipe.image
        for(let ingredient of recipe.ingredients){
          this.editRecipeIngredients.push(ingredient.id)
          this.editItemInRecipeWeightArr[ingredient.id] = ingredient.weightNeeded
        }
        this.editRecipeSteps = recipe.steps
      }
    }
    console.log(this.editRecipeIngredients)
  }

  findName(itemId: number): string | undefined {
    for(let item of this.ui.itemUnits){
      if(item.id === itemId){
        return item.name
      }
    }
    return
  }
  updateRecipe() {
    this.editRecipe = {
      name: this.editRecipeName,
      image: this.editRecipeImage,
      ingredientIds: [],
      steps: this.editRecipeSteps,
      userId: this.ui.currentUser?.id ? this.ui.currentUser.id : 0
    }
    this.ui.updateRecipe(this.ui.recipeIdToEdit, this.editRecipe)
    this.recipeNameImageEdited = true;
  }
  updateItemsInRecipe() {
    //need to get the recipe id from ui.recipes
    for(let recipe of this.ui.recipes){
      if(recipe.name === this.editRecipeName && recipe.image === this.editRecipeImage){
        this.recipeId = recipe.id
      }
    }

    for(let itemId of this.editRecipeIngredients){
      for(let ingredient of this.ui.itemInRecipes){
        if(ingredient.item.id === itemId){
          this.editItemInRecipeId = ingredient.id
        }
      }
      this.editItemInRecipe = {
        itemId: itemId,
        weightNeeded: this.editItemInRecipeWeightArr[itemId],
        recipeId: this.recipeId
      }
      this.ui.updateItemInRecipe(this.editItemInRecipeId, this.editItemInRecipe)
    }

    //update the recipe values
    for(let ingredient of this.ui.itemInRecipes){
      if(ingredient.recipe.name === this.editRecipeName && ingredient.recipe.image === this.editRecipeImage){
        this.editRecipe.ingredientIds.push(ingredient.id)
      }
    }
    this.editRecipe.steps = this.editRecipeSteps
    this.ui.updateRecipe(this.recipeId, this.editRecipe)
  }
}
