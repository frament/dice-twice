import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'dice-twice-right-top-actions',
  templateUrl: './right-top-actions.component.html',
  styleUrls: ['./right-top-actions.component.scss']
})
export class RightTopActionsComponent {

  constructor(public router: Router,public user: UserService) { }

}
