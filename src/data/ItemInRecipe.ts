import { ItemUnit } from "./ItemUnit"
import { Recipe } from "./Recipe"

export interface ItemInRecipe {
    id: number
    item: ItemUnit
    weightNeeded: number
    recipe: Recipe
}