import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { ItemUnit } from 'src/data/ItemUnit';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements OnDestroy{
  ui: UiService
  public newItemUnit: boolean = false
  public editItemUnitId: number = -1
  public displayedColumns: string[] = ['image', 'name', 'weightPerUnit', 'caloriesPerUnit', 'pantryQuantity', 'Edit', 'Delete' ];
  public dataSource: ItemUnit[] = []
  private itemUnitsSubscription: Subscription

  constructor(ui:UiService){
    this.ui = ui
    ui.loadItemUnits()
    this.itemUnitsSubscription = ui.whenItemUnitsUpdates().subscribe(itemUnits => {
      this.dataSource = itemUnits
    })
  }
  ngOnDestroy(): void {
    this.itemUnitsSubscription.unsubscribe()
  }

  openItemUnitEdit(id: number) {
    this.ui.itemUnitIdToEdit = id
    this.editItemUnitId = id
  }

}
