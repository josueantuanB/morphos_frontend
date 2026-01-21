import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Menu } from '../menu/menu';
import { FieldTypeSelector, FieldType, TypeFormField } from '../../features/forms/components/field-type-selector/field-type-selector';
import { FieldEditorPanel, FormField } from '../../features/forms/components/field-editor-panel/field-editor-panel';

@Component({
    selector: 'app-create-form',
    standalone: true,
    imports: [ButtonModule, Menu, FieldTypeSelector, FieldEditorPanel],
    templateUrl: './create-form.html',
    styleUrl: './create-form.css'
})
export class CreateForm {
    formTitle = signal('Inspección de Estanterías');
    blocks = signal<FormField[]>([]);

    // Modal states
    showTypeSelector = signal(false);
    showFieldEditor = signal(false);
    selectedFieldType = signal<FieldType>(TypeFormField.TEXT);

    constructor(private router: Router) { }

    goBack() {
        this.router.navigate(['/forms']);
    }

    saveDraft() {
        console.log('Saving draft...', this.blocks());
    }

    saveForm() {
        console.log('Saving form...', this.blocks());
    }

    addBlock() {
        this.showTypeSelector.set(true);
    }

    onTypeSelected(type: FieldType) {
        this.selectedFieldType.set(type);
        this.showFieldEditor.set(true);
    }

    onFieldSaved(field: FormField) {
        this.blocks.update(blocks => [...blocks, field]);
    }

    onAddAnotherField() {
        this.showTypeSelector.set(true);
    }

    editDetails() {
        console.log('Editing details...');
    }

    removeBlock(id: string) {
        this.blocks.update(blocks => blocks.filter(b => b.id !== id));
    }

    getFieldTypeLabel(type: FieldType): string {
        const labels: Record<string, string> = {
            [TypeFormField.TEXT]: 'Texto',
            [TypeFormField.NUMBER]: 'Número',
            [TypeFormField.DATE]: 'Fecha',
            [TypeFormField.SELECT]: 'Lista desplegable',
            [TypeFormField.RADIO]: 'Opción única',
            [TypeFormField.CHECKBOX]: 'Selección múltiple',
            [TypeFormField.FILE]: 'Archivo',
            [TypeFormField.CAMERA]: 'Cámara',
            [TypeFormField.SCAN]: 'Escanear código',
            [TypeFormField.NFC]: 'NFC',
            [TypeFormField.SIGNATURE]: 'Firma'
        };
        return labels[type] || 'Campo';
    }

    getFieldTypeColor(type: FieldType): string {
        const colors: Record<string, string> = {
            [TypeFormField.TEXT]: '#009088',
            [TypeFormField.NUMBER]: '#6366f1',
            [TypeFormField.DATE]: '#f59e0b',
            [TypeFormField.SELECT]: '#ec4899',
            [TypeFormField.RADIO]: '#8b5cf6',
            [TypeFormField.CHECKBOX]: '#14b8a6',
            [TypeFormField.FILE]: '#3b82f6',
            [TypeFormField.CAMERA]: '#ef4444',
            [TypeFormField.SCAN]: '#f97316',
            [TypeFormField.NFC]: '#0ea5e9',
            [TypeFormField.SIGNATURE]: '#84cc16'
        };
        return colors[type] || '#888';
    }
}
