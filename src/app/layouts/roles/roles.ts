import { Component, signal, viewChild } from '@angular/core';
import { Menu } from "../menu/menu";
import { UsersHeader } from "../../features/users/components/users-header/users-header";
import { RolesTable } from "../../features/users/components/roles-table/roles-table";
import { CreateRoleDialog, RoleData } from "../../features/users/components/create-role-dialog/create-role-dialog";

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [Menu, UsersHeader, RolesTable, CreateRoleDialog],
  templateUrl: './roles.html',
  styleUrl: './roles.css'
})
export class Roles {
  isCreateRoleModalVisible = signal(false);
  roleToEdit = signal<RoleData | null>(null);
  rolesTable = viewChild(RolesTable);

  openCreateRoleModal() {
    this.roleToEdit.set(null);
    this.isCreateRoleModalVisible.set(true);
  }

  onEditRole(roleData: RoleData) {
    this.roleToEdit.set(roleData);
    this.isCreateRoleModalVisible.set(true);
  }

  onRoleCreated() {
    this.roleToEdit.set(null);
    this.rolesTable()?.loadRoles();
  }
}
