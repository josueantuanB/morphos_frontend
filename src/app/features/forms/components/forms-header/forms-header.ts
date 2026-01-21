import { Component, output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-forms-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './forms-header.html',
  styleUrl: './forms-header.css'
})
export class FormsHeader {
  createTask = output<void>();
  createForm = output<void>();

  constructor(private router: Router) { }

  onCreateTask() {
    this.createTask.emit();
  }

  onCreateForm() {
    this.router.navigate(['/forms/create']);
  }
}
