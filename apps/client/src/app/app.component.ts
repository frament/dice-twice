import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'dice-twice-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}
  user:any;

  async ngOnInit(): Promise<void> {
    this.userService.init();
    this.user = await this.userService.profile();
  }

}
