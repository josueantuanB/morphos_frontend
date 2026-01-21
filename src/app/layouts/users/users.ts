import { Component, signal } from '@angular/core';
import { Menu } from "../menu/menu";
import { UsersHeader } from "../../features/users/components/users-header/users-header";
import { UsersStatsCards } from "../../features/users/components/users-stats-cards/users-stats-cards";
import { UsersTable } from "../../features/users/components/users-table/users-table";
import { User, UsersStats } from "../../features/users/models/user.interface";

@Component({
  selector: 'app-users',
  imports: [Menu, UsersHeader, UsersStatsCards, UsersTable],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  // Datos de estadísticas
  stats = signal<UsersStats>({
    total: 36,
    active: 24,
    inactive: 12,
    performance: null
  });

  // Datos mock de usuarios
  users = signal<User[]>(
    Array.from({ length: 25 }, (_, i) => ({
      usrId: (974019 + i).toString(),
      usrName: `Usuario Prueba ${i + 1}`,
      usrEmail: `usuario${i + 1}@company.com`,
      usrRole: i % 3 === 0 ? 'Admin' : 'Usuario',
      usrLastTask: `${10 + (i % 8)}:${10 * (i % 6)}`,
      usrTasksCompleted: Math.floor(Math.random() * 100),
      usrActive: i % 5 !== 0 // Algunos inactivos
    }))
  );

  onNewUser(): void {
    console.log('Nuevo usuario');
  }

  onAssignUsers(users: User[]): void {
    console.log('Asignar usuarios:', users);
  }
}
