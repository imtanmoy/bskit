import * as React from 'react';
import { css, ClassNames } from '@emotion/react';
import { getInitials, stringToHslColor } from './utils';

export type AvatarSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
    name?: string;
    src?: string;
    size?: AvatarSizes | number;
    className?: string;
    shape?: 'cicle' | 'square';
    onClick?: (event: React.SyntheticEvent) => void;
}

const sizes = () => ({
    xs: css({ width: '1.25rem', height: '1.25rem', fontSize: '0.7rem' }),
    sm: css({ width: '2.02rem', height: '2.02rem', fontSize: '0.875rem' }),
    md: css({ width: '3.27rem', height: '3.27rem', fontSize: '1.41rem' }),
    lg: css({ width: '5.29rem', height: '5.29rem', fontSize: '2.29rem' }),
    xl: css({ width: '8.57rem', height: '8.57rem', fontSize: '3.70rem' }),
});

const Avatar: React.FC<AvatarProps> = ({ src, size = 'md', className, name = '?', shape = 'circle', onClick }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [error, setError] = React.useState(false);

    function onError() {
        setError(true);
    }

    const handleHover = React.useCallback(
        (hover: boolean): void => {
            setIsHovered(hover);
        },
        [setIsHovered],
    );

    const handleMouseEnter = (): void => {
        handleHover(true);
    };

    const handleMouseLeave = (): void => {
        handleHover(false);
    };

    const handleOnClick = (event: React.SyntheticEvent): void => {
        if (onClick) {
            onClick(event);
        } else {
            event.preventDefault();
        }
    };

    const borderRadius = shape === 'circle' ? '50%' : '10%';

    const sizeCss =
        typeof size === 'number'
            ? {
                  height: size,
                  width: size,
              }
            : {
                  ...sizes()[size],
              };

    const WrapperComponent = (props: { wrapperClassName?: string; className: string; children: React.ReactNode }) => {
        if (props.wrapperClassName) {
            return (
                <div className={props.wrapperClassName}>
                    <div className={props.className}>{props.children}</div>
                </div>
            );
        }
        return <div className={props.className}>{props.children}</div>;
    };

    return (
        <ClassNames>
            {({ css }) => (
                <WrapperComponent
                    wrapperClassName={className}
                    className={css({
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        flex: '0 0 auto',
                        justifyContent: 'center',
                        borderRadius: borderRadius,
                        opacity: isHovered ? '0.9' : '0.85',
                        ...sizeCss,
                    })}
                >
                    <div
                        onClick={handleOnClick}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        css={{
                            display: 'block',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: '0',
                            left: '0',
                            zIndex: 3005,
                        }}
                    >
                        <div
                            css={{
                                position: 'absolute',
                                width: '29.8%',
                                height: '29.8%',
                                borderRadius: '100%',
                                bottom: '1.2%',
                                right: '1.2%',
                                cursor: 'pointer',
                            }}
                        ></div>
                    </div>
                    {src && !error ? (
                        <img
                            alt={name.length ? name : ''}
                            src={src}
                            onError={onError}
                            css={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                borderRadius: borderRadius,
                            }}
                        />
                    ) : (
                        <div
                            css={{
                                background: stringToHslColor(getInitials(name), 50, 50),
                                width: '100%',
                                height: '100%',
                                borderRadius: borderRadius,
                                display: 'flex',
                                justifyContent: 'center',
                                justifyItems: 'center',
                            }}
                        >
                            <span
                                css={{
                                    fontSize: `${typeof size !== 'number' ? `inherit` : `${size / 2}px`}`,
                                    fontWeight: 500,
                                    margin: 'auto',
                                    color: 'rgba(0,0,0,0.75)',
                                    alignSelf: 'center',
                                }}
                            >
                                {getInitials(name)}
                            </span>
                        </div>
                    )}
                </WrapperComponent>
            )}
        </ClassNames>
    );
};

export default Avatar;
