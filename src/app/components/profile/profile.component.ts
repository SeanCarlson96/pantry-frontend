import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { AppUserDTO } from 'src/DTOs/AppUserDTO';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  editUsername: string = ''
  editPassword: string = ''
  editAppUser = {} as AppUserDTO
  userRecipes: number[] = []


  constructor(public ui: UiService){
    this.editUsername = this.ui.currentUser?.username ? this.ui.currentUser?.username : ''
    this.editPassword = this.ui.currentUser?.password ? this.ui.currentUser?.password : ''
  }
  updateUserInfo(){
    if(this.ui.currentUser){
      for(let recipe of this.ui.currentUser.recipes){
        this.userRecipes.push(recipe.id)
      }
      this.editAppUser = {
        username: this.editUsername,
        password: this.editPassword,
        recipeIds: this.userRecipes
      }
      this.ui.updateAppUser(this.ui.currentUser.id, this.editAppUser)
    }
  }
  deleteUser(){
    if(this.ui.currentUser){
      this.ui.deleteAppUser(this.ui.currentUser.id)
    }
  }
}
