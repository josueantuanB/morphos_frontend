import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { FormItem } from '../../models/form.model';

@Component({
  selector: 'app-forms-table',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, SelectModule, CheckboxModule, MenuModule],
  templateUrl: './forms-table.html',
  styleUrl: './forms-table.css'
})
export class FormsTable {
  searchQuery = signal('');
  selectedFilter = signal('all');
  currentPage = signal(1);
  totalPages = 10;

  filterOptions = [
    { label: 'Todos', value: 'all' },
    { label: 'Publicados', value: 'published' },
    { label: 'Borradores', value: 'draft' }
  ];

  forms = signal<FormItem[]>([
    {
      id: 1, name: 'Inspección de Estanterías', description: 'Tienda #045',
      createdAt: '20 mayo, 2025', dueDate: '20 mayo, 2025', status: 'published',
      assignedUsers: [
        { avatar: 'https://i.pravatar.cc/32?img=1', name: 'User 1' },
        { avatar: 'https://i.pravatar.cc/32?img=2', name: 'User 2' },
        { avatar: 'https://i.pravatar.cc/32?img=3', name: 'User 3' },
        { avatar: 'https://i.pravatar.cc/32?img=4', name: 'User 4' },
        { avatar: 'https://i.pravatar.cc/32?img=5', name: 'User 5' },
        { avatar: 'https://i.pravatar.cc/32?img=6', name: 'User 6' },
        { avatar: 'https://i.pravatar.cc/32?img=7', name: 'User 7' },
        { avatar: 'https://i.pravatar.cc/32?img=8', name: 'User 8' }
      ]
    },
    {
      id: 2, name: 'Inspección de Estanterías', description: 'Tienda #045',
      createdAt: '20 mayo, 2025', dueDate: '20 mayo, 2025', status: 'draft',
      assignedUsers: [
        { avatar: 'https://i.pravatar.cc/32?img=9', name: 'User 9' },
        { avatar: 'https://i.pravatar.cc/32?img=10', name: 'User 10' },
        { avatar: 'https://i.pravatar.cc/32?img=11', name: 'User 11' },
        { avatar: 'https://i.pravatar.cc/32?img=12', name: 'User 12' },
        { avatar: 'https://i.pravatar.cc/32?img=13', name: 'User 13' },
        { avatar: 'https://i.pravatar.cc/32?img=14', name: 'User 14' },
        { avatar: 'https://i.pravatar.cc/32?img=15', name: 'User 15' },
        { avatar: 'https://i.pravatar.cc/32?img=16', name: 'User 16' }
      ]
    },
    {
      id: 3, name: 'Inspección de Estanterías', description: 'Tienda #045',
      createdAt: '20 mayo, 2025', dueDate: '20 mayo, 2025', status: 'draft',
      assignedUsers: [
        { avatar: 'https://i.pravatar.cc/32?img=17', name: 'User 17' },
        { avatar: 'https://i.pravatar.cc/32?img=18', name: 'User 18' },
        { avatar: 'https://i.pravatar.cc/32?img=19', name: 'User 19' },
        { avatar: 'https://i.pravatar.cc/32?img=20', name: 'User 20' },
        { avatar: 'https://i.pravatar.cc/32?img=21', name: 'User 21' },
        { avatar: 'https://i.pravatar.cc/32?img=22', name: 'User 22' },
        { avatar: 'https://i.pravatar.cc/32?img=23', name: 'User 23' },
        { avatar: 'https://i.pravatar.cc/32?img=24', name: 'User 24' }
      ]
    },
    {
      id: 4, name: 'Inspección de Estanterías', description: 'Tienda #045',
      createdAt: '20 mayo, 2025', dueDate: '20 mayo, 2025', status: 'published',
      assignedUsers: [
        { avatar: 'https://i.pravatar.cc/32?img=25', name: 'User 25' },
        { avatar: 'https://i.pravatar.cc/32?img=26', name: 'User 26' },
        { avatar: 'https://i.pravatar.cc/32?img=27', name: 'User 27' },
        { avatar: 'https://i.pravatar.cc/32?img=28', name: 'User 28' },
        { avatar: 'https://i.pravatar.cc/32?img=29', name: 'User 29' },
        { avatar: 'https://i.pravatar.cc/32?img=30', name: 'User 30' },
        { avatar: 'https://i.pravatar.cc/32?img=31', name: 'User 31' },
        { avatar: 'https://i.pravatar.cc/32?img=32', name: 'User 32' }
      ]
    },
    {
      id: 5, name: 'Inspección de Estanterías', description: 'Tienda #045',
      createdAt: '20 mayo, 2025', dueDate: '20 mayo, 2025', status: 'published',
      assignedUsers: [
        { avatar: 'https://i.pravatar.cc/32?img=33', name: 'User 33' },
        { avatar: 'https://i.pravatar.cc/32?img=34', name: 'User 34' },
        { avatar: 'https://i.pravatar.cc/32?img=35', name: 'User 35' },
        { avatar: 'https://i.pravatar.cc/32?img=36', name: 'User 36' },
        { avatar: 'https://i.pravatar.cc/32?img=37', name: 'User 37' },
        { avatar: 'https://i.pravatar.cc/32?img=38', name: 'User 38' },
        { avatar: 'https://i.pravatar.cc/32?img=39', name: 'User 39' },
        { avatar: 'https://i.pravatar.cc/32?img=40', name: 'User 40' }
      ]
    }
  ]);

  selectedForm = signal<FormItem | null>(null);

  menuItems: MenuItem[] = [
    { label: 'Editar', icon: 'pi pi-pencil', command: () => this.editForm() },
    { label: 'Eliminar', icon: 'pi pi-trash', command: () => this.deleteForm() }
  ];

  getVisibleAvatars(users: { avatar: string; name: string }[]) {
    return users.slice(0, 4);
  }

  getRemainingCount(users: { avatar: string; name: string }[]) {
    return users.length > 4 ? users.length - 4 : 0;
  }

  setSelectedForm(form: FormItem) {
    this.selectedForm.set(form);
  }

  editForm() {
    console.log('Edit form:', this.selectedForm());
  }


  deleteForm() {
    console.log('Delete form:', this.selectedForm());
  }

  onAssign() {
    console.log('Assign forms');
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }
}
