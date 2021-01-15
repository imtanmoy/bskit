import * as React from 'react';
import { css, keyframes, SerializedStyles } from '@emotion/react';

const clip = keyframes`
  0% {transform: rotate(0deg)}
  /* 50% {transform: rotate(180deg) scale(0.8)} */
  100% {transform: rotate(360deg)}
`;

interface SpinnerProps {
    size?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = '32px' }) => {
    const style = (): SerializedStyles => {
        return css`
            background: transparent !important;
            width: ${size};
            height: ${size};
            border-radius: 100%;
            border: 2px solid;
            border-color: #ee0aee;
            border-bottom-color: transparent;
            display: inline-block;
            animation: ${clip} 0.75s 0s infinite linear;
            animation-fill-mode: both;
            padding: 2px;
        `;
    };

    return <span css={[style()]} />;
};

export default Spinner;
