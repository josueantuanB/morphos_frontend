import { Component, model, input, output, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FieldType, TypeFormField } from '../field-type-selector/field-type-selector';

export interface FormField {
    id: string;
    type: FieldType;
    name: string;
    description: string;
    required: boolean;
    options?: string[];
}

interface FieldTypeMeta {
    label: string;
    icon: string;
    color: string;
}

@Component({
    selector: 'app-field-editor-panel',
    standalone: true,
    imports: [FormsModule, ButtonModule, InputTextModule, ToggleSwitchModule],
    templateUrl: './field-editor-panel.html',
    styleUrl: './field-editor-panel.css'
})
export class FieldEditorPanel {
    visible = model<boolean>(false);
    fieldType = input<FieldType>(TypeFormField.TEXT);
    fieldSaved = output<FormField>();
    addAnotherField = output<void>();

    fieldName = signal('');
    fieldDescription = signal('');
    isRequired = signal(false);
    options = signal<string[]>(['']);

    fieldTypeMeta = computed<FieldTypeMeta>(() => {
        const meta: Record<string, FieldTypeMeta> = {
            [TypeFormField.TEXT]: { label: 'Texto', icon: 'pi pi-align-left', color: '#009088' },
            [TypeFormField.NUMBER]: { label: 'Número', icon: 'pi pi-hashtag', color: '#6366f1' },
            [TypeFormField.DATE]: { label: 'Fecha', icon: 'pi pi-calendar', color: '#f59e0b' },
            [TypeFormField.SELECT]: { label: 'Lista desplegable', icon: 'pi pi-chevron-down', color: '#ec4899' },
            [TypeFormField.RADIO]: { label: 'Opción única', icon: 'pi pi-circle', color: '#8b5cf6' },
            [TypeFormField.CHECKBOX]: { label: 'Selección múltiple', icon: 'pi pi-check-square', color: '#14b8a6' },
            [TypeFormField.FILE]: { label: 'Archivo', icon: 'pi pi-file', color: '#3b82f6' },
            [TypeFormField.CAMERA]: { label: 'Cámara', icon: 'pi pi-camera', color: '#ef4444' },
            [TypeFormField.SCAN]: { label: 'Escanear código', icon: 'pi pi-qrcode', color: '#f97316' },
            [TypeFormField.NFC]: { label: 'NFC', icon: 'pi pi-wifi', color: '#0ea5e9' },
            [TypeFormField.SIGNATURE]: { label: 'Firma', icon: 'pi pi-pencil', color: '#84cc16' }
        };
        return meta[this.fieldType()] || { label: 'Campo', icon: 'pi pi-question', color: '#888' };
    });

    showOptionsEditor = computed(() =>
        [TypeFormField.SELECT, TypeFormField.RADIO, TypeFormField.CHECKBOX].includes(this.fieldType() as TypeFormField)
    );

    addOption() {
        this.options.update(opts => [...opts, '']);
    }

    removeOption(index: number) {
        if (this.options().length > 1) {
            this.options.update(opts => opts.filter((_, i) => i !== index));
        }
    }

    updateOption(index: number, value: string) {
        this.options.update(opts => opts.map((opt, i) => i === index ? value : opt));
    }

    saveField() {
        const field: FormField = {
            id: crypto.randomUUID(),
            type: this.fieldType(),
            name: this.fieldName(),
            description: this.fieldDescription(),
            required: this.isRequired(),
            options: this.showOptionsEditor() ? this.options().filter(o => o.trim()) : undefined
        };
        this.fieldSaved.emit(field);
        this.resetForm();
        this.visible.set(false);
    }

    cancel() {
        this.resetForm();
        this.visible.set(false);
    }

    onAddAnother() {
        this.saveField();
        this.addAnotherField.emit();
    }

    private resetForm() {
        this.fieldName.set('');
        this.fieldDescription.set('');
        this.isRequired.set(false);
        this.options.set(['']);
    }
}
