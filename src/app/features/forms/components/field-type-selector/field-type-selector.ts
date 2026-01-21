import { Component, model, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

export enum TypeFormField {
    TEXT = 'text',
    DATE = 'date',
    NUMBER = 'number',
    SELECT = 'select',
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
    FILE = 'file',
    CAMERA = 'camera',
    SCAN = 'scan',
    NFC = 'nfc',
    SIGNATURE = 'signature',
}

export type FieldType = TypeFormField;

export interface FieldTypeOption {
    type: FieldType;
    label: string;
    description: string;
    icon: string;
    color: string;
}

@Component({
    selector: 'app-field-type-selector',
    standalone: true,
    imports: [DialogModule],
    templateUrl: './field-type-selector.html',
    styleUrl: './field-type-selector.css'
})
export class FieldTypeSelector {
    visible = model<boolean>(false);
    typeSelected = output<FieldType>();

    fieldTypes: FieldTypeOption[] = [
        {
            type: TypeFormField.TEXT,
            label: 'Texto',
            description: 'Respuesta corta o texto libre',
            icon: 'pi pi-align-left',
            color: '#009088'
        },
        {
            type: TypeFormField.NUMBER,
            label: 'Número',
            description: 'Valores numéricos o cantidades',
            icon: 'pi pi-hashtag',
            color: '#6366f1'
        },
        {
            type: TypeFormField.DATE,
            label: 'Fecha',
            description: 'Seleccionar fecha del calendario',
            icon: 'pi pi-calendar',
            color: '#f59e0b'
        },
        {
            type: TypeFormField.SELECT,
            label: 'Lista desplegable',
            description: 'Seleccionar una opción de una lista',
            icon: 'pi pi-chevron-down',
            color: '#ec4899'
        },
        {
            type: TypeFormField.RADIO,
            label: 'Opción única',
            description: 'Elegir una sola opción visible',
            icon: 'pi pi-circle',
            color: '#8b5cf6'
        },
        {
            type: TypeFormField.CHECKBOX,
            label: 'Selección múltiple',
            description: 'Elegir varias opciones de una lista',
            icon: 'pi pi-check-square',
            color: '#14b8a6'
        },
        {
            type: TypeFormField.FILE,
            label: 'Archivo',
            description: 'Subir documentos o archivos',
            icon: 'pi pi-file',
            color: '#3b82f6'
        },
        {
            type: TypeFormField.CAMERA,
            label: 'Cámara',
            description: 'Tomar foto con la cámara',
            icon: 'pi pi-camera',
            color: '#ef4444'
        },
        {
            type: TypeFormField.SCAN,
            label: 'Escanear código',
            description: 'Leer código de barras o QR',
            icon: 'pi pi-qrcode',
            color: '#f97316'
        },
        {
            type: TypeFormField.NFC,
            label: 'NFC',
            description: 'Lectura de etiquetas NFC',
            icon: 'pi pi-wifi',
            color: '#0ea5e9'
        },
        {
            type: TypeFormField.SIGNATURE,
            label: 'Firma',
            description: 'Capturar firma digital',
            icon: 'pi pi-pencil',
            color: '#84cc16'
        }
    ];

    selectType(type: FieldType) {
        this.typeSelected.emit(type);
        this.visible.set(false);
    }
}
