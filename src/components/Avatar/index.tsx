import * as React from 'react';
import { css, ClassNames } from '@emotion/react';
import { AvatarSize } from '../../utils/size';
import { getInitials, stringToHslColor } from './utils';
import Image from '../Image';

export type AvatarSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
    src?: string;
    name?: string;
    alt?: string;
    size?: AvatarSizes | number;
    className?: string;
    shape?: 'circle' | 'square';
    onClick?: (event: React.SyntheticEvent) => void;
    border?: boolean;
}

const Avatar: React.FC<AvatarProps> = React.memo(
    ({
        src,
        alt,
        name = '?',
        size = 'md',
        className,
        shape = 'circle',
        onClick,
        border = false,
    }) => {
        const handleOnClick = React.useCallback(
            (event: React.SyntheticEvent): void => {
                if (onClick) {
                    onClick(event);
                } else {
                    event.preventDefault();
                }
            },
            [onClick],
        );

        const borderRadius = React.useMemo(
            () => (shape === 'circle' ? '50%' : '10%'),
            [shape],
        );

        const sizeCss =
            typeof size === 'number'
                ? css({
                      height: size,
                      width: size,
                  })
                : AvatarSize()[size];

        const WrapperComponent = (props: {
            wrapperClassName?: string;
            className: string;
            children: React.ReactNode;
        }) => {
            if (props.wrapperClassName) {
                return (
                    <div
                        className={`${props.className} ${props.wrapperClassName}`}
                    >
                        {props.children}
                    </div>
                );
            }
            return <div className={props.className}>{props.children}</div>;
        };

        const borderCss = css(
            border
                ? {
                      backgroundClip: 'padding-box',
                      border: border ? '2px solid transparent' : '',
                      borderRadius: borderRadius,
                      padding: '2px',
                      '&:before': {
                          content: "''",
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          bottom: '0',
                          left: '0',
                          zIndex: -1,
                          margin: '-$border',
                          borderRadius: 'inherit',
                          background: 'linear-gradient(to right, red, orange)',
                      },
                  }
                : {},
        );

        const renderAsImage = () => {
            return (
                <Image
                    src={src!}
                    alt={alt ? alt : 'user-avatar'}
                    style={{ borderRadius: borderRadius }}
                />
            );
        };

        const renderAsText = () => {
            return (
                <div
                    style={{
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
                        style={{
                            fontSize: `${
                                typeof size !== 'number'
                                    ? `inherit`
                                    : `${size / 2}px`
                            }`,
                            fontWeight: 500,
                            margin: 'auto',
                            color: 'rgba(0,0,0,0.75)',
                            alignSelf: 'center',
                        }}
                    >
                        {getInitials(name)}
                    </span>
                </div>
            );
        };

        return (
            <ClassNames>
                {({ css }) => (
                    <WrapperComponent
                        wrapperClassName={className}
                        className={css([
                            {
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                borderRadius: borderRadius,
                                // opacity: isHovered ? '0.9' : '0.85',
                                overflow: 'hidden',
                                userSelect: 'none',
                            },
                            sizeCss,
                            borderCss,
                        ])}
                    >
                        <div
                            // ref={hoverRef}
                            onClick={handleOnClick}
                            style={{
                                display: 'block',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: '0',
                                left: '0',
                                zIndex: 3005,
                            }}
                        />
                        {src ? renderAsImage() : renderAsText()}
                    </WrapperComponent>
                )}
            </ClassNames>
        );
    },
);

Avatar.displayName = 'Avatar';

export default Avatar;
