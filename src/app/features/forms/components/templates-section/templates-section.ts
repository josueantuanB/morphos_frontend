import { Component, signal } from '@angular/core';
import { FormTemplate } from '../../models/form.model';

@Component({
  selector: 'app-templates-section',
  standalone: true,
  imports: [],
  templateUrl: './templates-section.html',
  styleUrl: './templates-section.css'
})
export class TemplatesSection {
  templates = signal<FormTemplate[]>([
    { id: 1, title: 'Título del formulario', description: 'Descripción breve', color: 'blue' },
    { id: 2, title: 'Título del formulario', description: 'Descripción breve', color: 'purple' },
    { id: 3, title: 'Título del formulario', description: 'Descripción breve', color: 'orange' }
  ]);

  totalTemplates = 20;

  onTemplateClick(template: FormTemplate) {
    console.log('Template selected:', template);
  }

  onViewAllTemplates() {
    console.log('View all templates');
  }
}
