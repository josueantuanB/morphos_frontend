import { Component, input } from '@angular/core';
import { UsersStats } from '../../models/user.interface';

@Component({
  selector: 'app-users-stats-cards',
  imports: [],
  templateUrl: './users-stats-cards.html',
  styleUrl: './users-stats-cards.css'
})
export class UsersStatsCards {
  stats = input.required<UsersStats>();
}
