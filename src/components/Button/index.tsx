import { MouseEvent } from 'react';
import * as React from 'react';
import './index.scss';

export type ButtonType =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | 'link';

export type ButtonShape = 'circle' | 'round';

export interface ButtonProps {
    htmlType?: 'submit' | 'reset' | 'button';
    type?: ButtonType;
    // shape?: ButtonShape;
    block?: boolean;
    outlined?: boolean;
    size?: 'small' | 'medium' | 'large';
    label: string;
    onClick?: (e: MouseEvent) => void;
    disabled?: boolean;
    style?: React.CSSProperties;
}

/**
 * Primary UI component for user interaction
 */
const Button: React.FC<ButtonProps> = ({ label, htmlType, type, size, outlined, block, ...props }) => {
    const btnType = `btn-${outlined ? `outline-` : ''}${type}`;
    let btnSize = `btn-`;
    const btnBlock = block ? `btn-block` : '';
    switch (size) {
        case 'small':
            btnSize += 'sm';
            break;
        case 'large':
            btnSize += 'lg';
            break;
        default:
            btnSize += 'md';
            break;
    }
    return (
        <button type={htmlType} className={['btn', `${btnSize}`, btnType, btnBlock].join(' ')} {...props}>
            {label}
        </button>
    );
};

Button.displayName = 'Button';
Button.defaultProps = {
    htmlType: 'button',
    type: 'primary',
    size: 'medium',
    outlined: false,
    block: false,
};

export default Button;
