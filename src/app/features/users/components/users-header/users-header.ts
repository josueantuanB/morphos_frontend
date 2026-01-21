import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-header',
  imports: [ButtonModule, SelectModule, FormsModule],
  templateUrl: './users-header.html',
  styleUrl: './users-header.css'
})
export class UsersHeader {
  title = input('Usuarios');
  icon = input('icon-usuarios');
  buttonLabel = input('Nuevo usuario');
  showDateSelector = input(true);
  newUserClick = output<void>();
  
  dateOptions = [
    { label: 'Hoy', value: 'today' },
    { label: 'Esta semana', value: 'week' },
    { label: 'Este mes', value: 'month' },
    { label: 'Este año', value: 'year' }
  ];
  
  selectedDate = 'today';

  onNewUserClick(): void {
    this.newUserClick.emit();
  }
}
