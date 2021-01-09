import * as React from 'react';
import RcTooltip from 'rc-tooltip';
import { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';
import './index.scss';

export type TooltipPlacement =
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight';

export interface TooltipProps extends Partial<Omit<RcTooltipProps, 'children'>> {
    title: React.ReactNode;
    placement?: TooltipPlacement;
    trigger?: 'hover' | 'click';
    children: React.ReactNode;
}

const Tooltip = React.forwardRef<unknown, TooltipProps>((props, ref) => {
    const { children, title, placement } = props;

    const child = React.isValidElement(children) ? children : <span>{children}</span>;
    const childProps = child.props;

    return (
        <RcTooltip {...props} placement={placement} overlay={<span>{title}</span>} ref={ref}>
            {React.cloneElement(child, { className: childProps.className })}
        </RcTooltip>
    );
});

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
    placement: 'top',
    // transitionName: 'rc-tooltip-zoom',
    // mouseEnterDelay: 0.1,
    // mouseLeaveDelay: 0.1,
    trigger: 'hover',
};

export default Tooltip;
