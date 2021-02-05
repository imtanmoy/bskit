import * as React from 'react';
import useImage from '../../hooks/useImage';
import Spinner from '../Spinner';

export interface ImageProps {
    src: string;
    alt?: string;
    width?: string;
    height?: string;
    className?: string;
    style?: React.CSSProperties;
    errorRender?: React.ReactNode;
    loadingRender?: React.ReactNode;
}

const Image: React.FC<ImageProps> = React.memo(
    ({
        src,
        alt,
        width = '100%',
        height = '100%',
        className,
        style = {},
        errorRender,
        loadingRender,
    }) => {
        const { img, isLoading, err } = useImage(src);

        if (!isLoading && err) {
            if (errorRender) {
                return <>{errorRender}</>;
            }
            return <p>could not load image</p>;
        }

        if (!isLoading && img) {
            return (
                <img
                    className={className || ''}
                    style={{
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        objectFit: 'cover',
                        color: 'transparent',
                        textIndent: 10000,
                        ...style,
                    }}
                    src={img}
                    alt={alt}
                    width={width}
                    height={height}
                />
            );
        }

        if (loadingRender) {
            return <>{loadingRender}</>;
        }
        return <Spinner />;
    },
);

Image.displayName = 'Image';

export default Image;
