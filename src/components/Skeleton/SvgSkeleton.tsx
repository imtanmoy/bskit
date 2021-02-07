import * as React from 'react';
import uid from '../../utils/uid';

export interface SvgSkeletonProps extends React.SVGAttributes<SVGElement> {
    interval?: number;
    rtl?: boolean;
    speed?: number;
    title?: string;
    uniqueKey?: string;
    animate?: boolean;
    backgroundColor?: string;
    backgroundOpacity?: number;
    baseUrl?: string;
    foregroundColor?: string;
    foregroundOpacity?: number;
    gradientRatio?: number;
}

const SvgSkeleton: React.FC<SvgSkeletonProps> = ({
    animate = true,
    backgroundColor = '#f5f6f7',
    backgroundOpacity = 1,
    baseUrl = '',
    foregroundColor = '#eee',
    foregroundOpacity = 1,
    gradientRatio = 2,
    interval = 0.25,
    rtl = false,
    speed = 1.2,
    style = {},
    title = 'Loading...',
    children,
    ...props
}) => {
    const fixedId = uid();
    const idClip = `${fixedId}-diff`;
    const idGradient = `${fixedId}-animated-diff`;
    const idAria = `${fixedId}-aria`;

    const rtlStyle = rtl ? { transform: 'scaleX(-1)' } : null;
    const keyTimes = `0; ${interval}; 1`;
    const dur = `${speed}s`;

    return (
        <svg
            aria-labelledby={idAria}
            role="img"
            style={{ ...style, ...rtlStyle }}
            {...props}
        >
            {title ? <title id={idAria}>{title}</title> : null}
            <rect
                role="presentation"
                x="0"
                y="0"
                width="100%"
                height="100%"
                clipPath={`url(${baseUrl}#${idClip})`}
                style={{ fill: `url(${baseUrl}#${idGradient})` }}
            />

            <defs role="presentation">
                <clipPath id={idClip}>{children}</clipPath>

                <linearGradient id={idGradient}>
                    <stop
                        offset="0%"
                        stopColor={backgroundColor}
                        stopOpacity={backgroundOpacity}
                    >
                        {animate && (
                            <animate
                                attributeName="offset"
                                values={`${-gradientRatio}; ${-gradientRatio}; 1`}
                                keyTimes={keyTimes}
                                dur={dur}
                                repeatCount="indefinite"
                            />
                        )}
                    </stop>

                    <stop
                        offset="50%"
                        stopColor={foregroundColor}
                        stopOpacity={foregroundOpacity}
                    >
                        {animate && (
                            <animate
                                attributeName="offset"
                                values={`${-gradientRatio / 2}; ${
                                    -gradientRatio / 2
                                }; ${1 + gradientRatio / 2}`}
                                keyTimes={keyTimes}
                                dur={dur}
                                repeatCount="indefinite"
                            />
                        )}
                    </stop>

                    <stop
                        offset="100%"
                        stopColor={backgroundColor}
                        stopOpacity={backgroundOpacity}
                    >
                        {animate && (
                            <animate
                                attributeName="offset"
                                values={`0; 0; ${1 + gradientRatio}`}
                                keyTimes={keyTimes}
                                dur={dur}
                                repeatCount="indefinite"
                            />
                        )}
                    </stop>
                </linearGradient>
            </defs>
        </svg>
    );
};

SvgSkeleton.displayName = 'SvgSkeleton';

export default SvgSkeleton;
