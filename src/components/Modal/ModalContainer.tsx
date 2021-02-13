import * as React from 'react';
import { css } from '@emotion/react';

interface ModalContainerProps {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    center?: boolean;
}

const ModalContainer = React.forwardRef<HTMLDivElement, ModalContainerProps>(
    ({ onClick, center = true, children }, ref) => {
        const centerCss = css(
            center
                ? {
                      '&:after': {
                          width: 0,
                          height: '100%',
                          content: '""',
                          display: 'inline-block',
                          verticalAlign: 'middle',
                      },
                  }
                : {},
        );

        return (
            <div
                ref={ref}
                css={centerCss}
                style={{
                    height: '100%',
                    outline: 0,
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    textAlign: 'center',
                }}
                data-testid="modal-container"
                onClick={onClick}
            >
                {children}
            </div>
        );
    },
);

ModalContainer.displayName = 'ModalContainer';

export default ModalContainer;
