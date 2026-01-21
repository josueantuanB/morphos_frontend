import { Component, signal } from '@angular/core';
import { Menu } from "../menu/menu";
import { UsersHeader } from "../../features/users/components/users-header/users-header";
import { RolesTable } from "../../features/users/components/roles-table/roles-table";
import { CreateRoleDialog } from "../../features/users/components/create-role-dialog/create-role-dialog";

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [Menu, UsersHeader, RolesTable, CreateRoleDialog],
  templateUrl: './roles.html',
  styleUrl: './roles.css'
})
export class Roles {
  isCreateRoleModalVisible = signal(false);

  openCreateRoleModal() {
    this.isCreateRoleModalVisible.set(true);
  }
}
