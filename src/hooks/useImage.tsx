import { useState } from 'react';
import useSafeState from './useSafeState';
const imagePromiseFactory = ({ decode = true, crossOrigin = '' }) => (
    src: string,
): Promise<void> => {
    return new Promise((resolve, reject) => {
        const i = new Image();
        if (crossOrigin) {
            i.crossOrigin = crossOrigin;
        }
        i.onload = () => {
            decode && i.decode
                ? i.decode().then(resolve).catch(reject)
                : resolve();
        };
        i.onerror = reject;
        i.src = src;
    });
};

export default function useImage(
    src: string,
): { isLoading: boolean; img: string | null; err: Event | null } {
    const [isLoading, setIsLoading] = useSafeState(true);
    const [img, setImg] = useState<string | null>(null);
    const [err, setErr] = useState<Event | null>(null);

    const imgPromise = imagePromiseFactory({ decode: true });

    imgPromise(src)
        .then(() => {
            setErr(null);
            setImg(src);
        })
        .catch((error) => {
            setImg(null);
            setErr(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    return { isLoading, img, err };
}
