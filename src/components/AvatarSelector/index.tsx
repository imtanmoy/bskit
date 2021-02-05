import * as React from 'react';
import { css } from '@emotion/react';
import Avatar, { AvatarProps } from '../Avatar';
import useFilePicker from '../../hooks/useFilePicker';
import { fileToBase64 } from './utils';
import CameraIconSvg from './CameraIconSvg';
import RemoveIconSvg from './RemoveIconSvg';

const sizes = () => ({
    xs: css({ width: '1.25rem', height: '1.25rem', fontSize: '0.7rem' }),
    sm: css({ width: '2.02rem', height: '2.02rem', fontSize: '0.875rem' }),
    md: css({ width: '3.27rem', height: '3.27rem', fontSize: '1.41rem' }),
    lg: css({ width: '5.29rem', height: '5.29rem', fontSize: '2.29rem' }),
    xl: css({ width: '8.57rem', height: '8.57rem', fontSize: '3.70rem' }),
});

export interface AvatarSelectorProps extends AvatarProps {
    onChange: (avatar: File) => void;
    onRemove?: () => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
    src,
    size = 'md',
    className,
    name,
    onChange,
    onRemove,
    ...rest
}) => {
    const [img, setImg] = React.useState<string | null>(null);

    const [files, openFileSelector] = useFilePicker({
        multiple: false,
        accept: 'image/*',
    });

    React.useEffect(() => {
        if (files.length > 0) {
            fileToBase64(files[0]).then((data) => {
                setImg(data);
            });
            onChange(files[0]);
        }
    }, [files, onChange, setImg]);

    const handleAvatarChangerClick = (): void => {
        openFileSelector();
    };

    const handleAvatarRemoveClick = (): void => {
        if (img && onRemove) {
            setImg(null);
            onRemove();
        }
    };

    const sizeCss =
        typeof size === 'number'
            ? css({
                  height: size,
                  width: size,
              })
            : sizes()[size];

    const renderSelector = () => {
        if (img) {
            return null;
        }
        return (
            <div
                onClick={handleAvatarChangerClick}
                id="avatar_selector_button"
                css={{
                    backgroundColor: '#fff',
                    padding: '0px',
                    position: 'absolute',
                    width: '25%',
                    height: '25%',
                    borderRadius: '100%',
                    bottom: '1.2%',
                    right: '1.2%',
                    cursor: 'pointer',
                    border: '1px',
                    zIndex: 3005,
                }}
            >
                <CameraIconSvg />
            </div>
        );
    };

    const renderRemove = () => {
        if (img && onRemove) {
            return (
                <div
                    onClick={handleAvatarRemoveClick}
                    id="avatar_remove_button"
                    css={{
                        backgroundColor: '#fff',
                        padding: '0px',
                        position: 'absolute',
                        width: '25%',
                        height: '25%',
                        borderRadius: '100%',
                        top: '1.2%',
                        right: '1.2%',
                        cursor: 'pointer',
                        border: '1px',
                        zIndex: 3005,
                    }}
                >
                    <RemoveIconSvg />
                </div>
            );
        }
        return null;
    };

    return (
        <div css={css([sizeCss, css({ position: 'relative' })])}>
            <Avatar
                size={size}
                src={img || src}
                name={name}
                onClick={handleAvatarChangerClick}
                {...rest}
            />
            {renderSelector()}
            {renderRemove()}
        </div>
    );
};

AvatarSelector.displayName = 'AvatarSelector';

export default AvatarSelector;
