import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public ui: UiService;
  public suUsername: string = ''
  public suPassword: string = ''

  constructor(ui: UiService){
    this.ui = ui
  }
  onSignUp(suUsername: string, suPassword: string) {
    this.suUsername = suUsername
    this.suPassword = suPassword
    this.ui.addAppUser({
      username: this.suUsername, 
      password: this.suPassword,
      recipeIds: []
    })
  }
}
