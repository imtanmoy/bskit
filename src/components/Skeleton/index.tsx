import * as React from 'react';
import SvgSkeleton from './SvgSkeleton';

export interface SkeletonProps {
    size?: number | string;
    shape?: 'circular' | 'rectangular' | 'default';
    interval?: number;
    rtl?: boolean;
    speed?: number;
    title?: string;
    backgroundColor?: string;
    backgroundOpacity?: number;
    foregroundColor?: string;
    foregroundOpacity?: number;
    gradientRatio?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
    size = '100%',
    shape = 'default',
    ...props
}) => {
    if (shape === 'circular') {
        return (
            <SvgSkeleton
                height={size}
                width={size}
                viewBox="0 0 100 100"
                {...props}
            >
                <circle cx="50" cy="50" r="50" />
            </SvgSkeleton>
        );
    }

    if (shape === 'rectangular') {
        return (
            <SvgSkeleton
                height={size}
                width={size}
                viewBox="0 0 100 100"
                {...props}
            >
                <rect x="0" y="0" width="100%" height="100%" />
            </SvgSkeleton>
        );
    }

    return (
        <SvgSkeleton height="100%" viewBox="0 0 476 124" {...props}>
            <rect x="48" y="8" width="88" height="6" rx="3" />
            <rect x="48" y="26" width="52" height="6" rx="3" />
            <rect x="0" y="56" width="410" height="6" rx="3" />
            <rect x="0" y="72" width="380" height="6" rx="3" />
            <rect x="0" y="88" width="178" height="6" rx="3" />
            <circle cx="20" cy="20" r="20" />
        </SvgSkeleton>
    );
};

Skeleton.displayName = 'Skeleton';

export default Skeleton;
