import * as React from 'react';

type RenderFunction = () => React.ReactNode;

export interface PopoverProps {
    title?: React.ReactNode | RenderFunction;
    content?: React.ReactNode | RenderFunction;
}

const Popover = React.forwardRef<unknown, PopoverProps>(({ title, content }, ref) => {
    return (
        <div ref={ref as any}>
            <h1>{title}</h1>
            <div>{content}</div>
        </div>
    );
});

Popover.displayName = 'Popover';

Popover.defaultProps = {
    title: 'Popover Title',
    content: 'Popover Content',
};

export default Popover;
