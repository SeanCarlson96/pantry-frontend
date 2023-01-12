export interface ItemUnitDTO {
    id?: number
    name: string
    image: string
    weightPerUnit: number
    caloriesPerUnit: number
    pantryQuantity: number
    pantryId: number
    thisItemInRecipeIds: number[]
}