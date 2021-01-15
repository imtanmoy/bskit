export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener(
            'load',
            () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                }
            },
            false,
        );

        reader.addEventListener(
            'error',
            () => {
                reject(new Error('There was an error uploading the file'));
            },
            false,
        );

        if (file) {
            reader.readAsDataURL(file);
        }
    });
}

export function selectFiles(callback: (files: File[]) => void, multiple?: boolean, accept?: string): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = Boolean(multiple);

    if (accept) {
        input.accept = accept;
    } else {
        input.accept = 'image/*';
    }

    input.onchange = () => {
        const files = input.files;
        if (files) {
            callback(Array.from(files));
        }

        input.onchange = null;
    };

    input.click();
}
