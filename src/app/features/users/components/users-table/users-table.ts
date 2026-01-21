import { Component, input, output, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.interface';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-users-table',
  imports: [FormsModule, ButtonModule, InputTextModule, CheckboxModule, MenuModule],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css'
})
export class UsersTable {
  users = input.required<User[]>();
  
  assignClick = output<User[]>();
  
  searchQuery = signal('');
  currentPage = signal(1);
  pageSize = 10;
  selectedUsers = signal<Set<string>>(new Set());
  allSelected = signal(false);

  rowMenuItems: MenuItem[] = [
    { label: 'Ver detalle', icon: 'pi pi-eye' },
    { label: 'Editar', icon: 'pi pi-pencil' },
    { separator: true },
    { label: 'Eliminar', icon: 'pi pi-trash', styleClass: 'text-danger' }
  ];

  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.users();
    return this.users().filter(user => 
      user.usrId.toLowerCase().includes(query) ||
      user.usrName.toLowerCase().includes(query) ||
      user.usrEmail.toLowerCase().includes(query)
    );
  });

  paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredUsers().slice(start, start + this.pageSize);
  });

  totalPages = computed(() => Math.ceil(this.filteredUsers().length / this.pageSize));

  toggleSelectAll(): void {
    if (this.allSelected()) {
      this.selectedUsers.set(new Set());
      this.allSelected.set(false);
    } else {
      const allIds = new Set(this.paginatedUsers().map(u => u.usrId));
      this.selectedUsers.set(allIds);
      this.allSelected.set(true);
    }
  }

  toggleUserSelection(userId: string): void {
    const current = new Set(this.selectedUsers());
    if (current.has(userId)) {
      current.delete(userId);
    } else {
      current.add(userId);
    }
    this.selectedUsers.set(current);
    this.allSelected.set(current.size === this.paginatedUsers().length);
  }

  isSelected(userId: string): boolean {
    return this.selectedUsers().has(userId);
  }

  onAssignClick(): void {
    const selected = this.users().filter(u => this.selectedUsers().has(u.usrId));
    this.assignClick.emit(selected);
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  getProgressBarClass(percentage: number): string {
    if (percentage >= 70) return 'progress-bar--high';
    if (percentage >= 40) return 'progress-bar--medium';
    return 'progress-bar--low';
  }
}
