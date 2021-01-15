import * as React from 'react';

export interface ImageProps {
    src: string;
    alt?: string;
    width?: string;
    height?: string;
    className?: string;
    onError?: () => void;
    style?: React.CSSProperties;
    errorRender?: React.ReactNode;
    loadingRender?: React.ReactNode;
}

const ImageLoader: React.FC<ImageProps> = ({
    src,
    alt,
    width = '100%',
    height = '100%',
    className,
    onError,
    style = {},
    errorRender,
    loadingRender,
}) => {
    const [loading, setLoading] = React.useState(true);
    const [err, setErr] = React.useState<Event | null>(null);
    const reload = () => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
            setLoading(!image.complete);
        };
        image.onerror = (er: Event) => {
            setLoading(false);
            setErr(er);
            if (onError) {
                onError();
            }
        };
    };

    React.useEffect(() => {
        reload();
    }, [src]);

    if (loading) {
        if (loadingRender) {
            return <>{loadingRender}</>;
        }
        return <span>loading</span>;
    }

    if (!loading && err && errorRender) {
        return <>{errorRender}</>;
    }

    return <img src={src} alt={alt} width={width} height={height} className={className} css={{ ...style }} />;
};

export default ImageLoader;
