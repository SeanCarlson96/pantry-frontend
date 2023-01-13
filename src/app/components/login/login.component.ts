import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public ui: UiService;  
  public liUsername: string = ''
  public liPassword: string = ''

  constructor(ui: UiService){
    this.ui = ui
  }
  onLogIn(liUsername: string, liPassword: string) {
    this.liUsername = liUsername
    this.liPassword = liPassword
    this.ui.getAppUser(this.liUsername, this.liPassword)
  }
}
