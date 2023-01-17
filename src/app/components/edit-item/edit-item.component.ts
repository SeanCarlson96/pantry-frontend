import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { ItemUnitDTO } from 'src/DTOs/ItemUnitDTO';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent {
  updatedItemUnit = {} as ItemUnitDTO
  editItemUnitName: string = ''
  editItemUnitImage: string = ''
  editItemUnitWeightPerUnit: number = 0
  editItemUnitCaloriesPerUnit: number = 0
  editItemUnitPantryQuantity: number = 0

  constructor(public ui: UiService) {
    //get the item that we want to edit and set its value to our ngmodel values
    for(let item of ui.itemUnits) {
      if(item.id === ui.itemUnitIdToEdit){
        this.editItemUnitName = item.name
        this.editItemUnitImage = item.image
        this.editItemUnitWeightPerUnit = item.weightPerUnit
        this.editItemUnitCaloriesPerUnit = item.caloriesPerUnit
        this.editItemUnitPantryQuantity = item.pantryQuantity
      }
    }
  }

  updateItemUnit(){
    this.updatedItemUnit = {
      name: this.editItemUnitName,
      image: this.editItemUnitImage,
      weightPerUnit: this.editItemUnitWeightPerUnit,
      caloriesPerUnit: this.editItemUnitCaloriesPerUnit,
      pantryQuantity: this.editItemUnitPantryQuantity,
      pantryId: 1,
      thisItemInRecipeIds: []  //sending this as empty, and never using this for the update on the back end
    }
    this.ui.updateItemUnit(this.ui.itemUnitIdToEdit, this.updatedItemUnit)
  }
}
