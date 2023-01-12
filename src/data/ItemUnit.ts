import { ItemInRecipe } from "./ItemInRecipe"
import { Pantry } from "./Pantry"

export interface ItemUnit {
    id: number
    name: string
    image: string
    weightPerUnit: number
    caloriesPerUnit: number
    pantryQuantity: number
    pantry: Pantry
    thisItemInRecipes: ItemInRecipe[]
}