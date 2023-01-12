export interface RecipeDTO {
    id?: number
    name: string
    image: string
    ingredientIds: number[]
    steps: string
    userId: number
}