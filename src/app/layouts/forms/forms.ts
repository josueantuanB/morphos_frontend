import { Component } from '@angular/core';
import { Menu } from "../menu/menu";
import { FormsHeader } from "../../features/forms/components/forms-header/forms-header";
import { TemplatesSection } from "../../features/forms/components/templates-section/templates-section";
import { FormsTable } from "../../features/forms/components/forms-table/forms-table";

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [Menu, FormsHeader, TemplatesSection, FormsTable],
  templateUrl: './forms.html',
  styleUrl: './forms.css'
})
export class Forms {
  onCreateTask() {
    console.log('Create task');
  }

  onCreateForm() {
    console.log('Create form');
  }
}
