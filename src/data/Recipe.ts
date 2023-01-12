import { AppUser } from "./AppUser"
import { ItemInRecipe } from "./ItemInRecipe"

export interface Recipe {
    id: number
    name: string
    image: string
    ingredients: ItemInRecipe[]
    steps: string
    user: AppUser
}