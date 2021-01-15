import { useState } from 'react';
const imagePromiseFactory = ({ decode = true, crossOrigin = '' }) => (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const i = new Image();
        if (crossOrigin) i.crossOrigin = crossOrigin;
        i.onload = () => {
            decode && i.decode ? i.decode().then(resolve).catch(reject) : resolve();
        };
        i.onerror = reject;
        i.src = src;
    });
};

export default function useImage(src: string): { img: string | undefined; isLoading: boolean; err: any } {
    const [isLoading, setIsLoading] = useState(true);
    const [img, setImg] = useState<any>(null);
    const [err, setErr] = useState(null);

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
