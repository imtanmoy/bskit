import * as React from 'react';
import { css } from '@emotion/react';

const color = 'white';

const Modal: React.FC = () => {
    return (
        <div
            css={css`
                padding: 32px;
                background-color: hotpink;
                font-size: 24px;
                border-radius: 4px;
                &:hover {
                    color: ${color};
                }
            `}
        >
            <button>Hello</button>
        </div>
    );
};

export default Modal;
