import { useState } from 'react';

export interface UseFilePickerConfig {
    multiple?: boolean;
    accept?: string | string[];
}

export type FilePickerReturnTypes = [File[], () => void];

function openFileDialog(accept: string, multiple: boolean, callback: (arg: any) => void) {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = accept;
    inputElement.multiple = multiple;
    inputElement.addEventListener('change', callback);
    inputElement.dispatchEvent(new MouseEvent('click'));
}

function isInput(value: EventTarget | null): value is HTMLInputElement {
    return value !== null;
}

function fromList<T>(items: DataTransferItemList | FileList): T[] {
    const files = [];
    for (let i = 0; i < items.length; i++) {
        const file = items[i];
        files.push(file);
    }
    return files as any;
}

function getInputFiles(evt: Event) {
    const files = isInput(evt.target) ? (evt.target.files ? fromList<File>(evt.target.files) : []) : [];
    return files;
}

function useFilePicker({ accept = '*', multiple = true }: UseFilePickerConfig): FilePickerReturnTypes {
    const [files, setFiles] = useState<File[]>([]);

    const openFileSelector = () => {
        const fileExtensions = accept instanceof Array ? accept.join(',') : accept;
        openFileDialog(fileExtensions, multiple, (evt) => {
            setFiles(getInputFiles(evt));
        });
    };

    return [files, openFileSelector];
}
export default useFilePicker;
