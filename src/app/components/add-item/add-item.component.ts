import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { ItemUnitDTO } from 'src/DTOs/ItemUnitDTO';
import { PantryDTO } from 'src/DTOs/PantryDTO';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  newItemUnit = {} as ItemUnitDTO
  newPantry = {} as PantryDTO
  newItemUnitName: string = ''
  newItemUnitImage: string = ''
  newItemUnitWeightPerUnit: number = 0
  newItemUnitCaloriesPerUnit: number = 0
  newItemUnitPantryQuantity: number = 0

  constructor(public ui: UiService) { }

  createItemUnit(){
    if(this.ui.pantries.length < 1){
      this.newPantry = {
        itemIds: []
      }
      this.ui.addPantry(this.newPantry)
    }
    this.newItemUnit = {
      name: this.newItemUnitName,
      image: this.newItemUnitImage,
      weightPerUnit: this.newItemUnitWeightPerUnit,
      caloriesPerUnit: this.newItemUnitCaloriesPerUnit,
      pantryQuantity: this.newItemUnitPantryQuantity,
      pantryId: 1,
      thisItemInRecipeIds: []
    }
    this.ui.addItemUnit(this.newItemUnit)
  }
}
