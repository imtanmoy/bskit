import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import './index.scss';

interface ConfirmDialogProps {
    title?: string;
    content?: string;
    icon?: React.ReactNode;
    close: () => void;
    onOk: () => void;
    onCancel: () => void;
}

const contentPrefixCls = 'react-confirm-alert';

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, content, icon, close, onOk, onCancel }) => {
    const [ref] = useOnClickOutside(close);

    const handleNoClick = () => {
        onCancel();
        close();
    };

    const handleOkClick = () => {
        onOk();
        close();
    };

    return (
        <>
            <div className={`${contentPrefixCls}-overlay`}>
                <div ref={ref} className={`${contentPrefixCls}-wrapper`}>
                    <div className={`${contentPrefixCls}-body`}>
                        {icon}
                        {title === undefined ? null : <span className={`${contentPrefixCls}-title`}>{title}</span>}
                        <div className={`${contentPrefixCls}-content`}>{content}</div>
                        <div className={`${contentPrefixCls}-btns`}>
                            <button
                                type="button"
                                className="btn btn-outline-light btn-sm"
                                style={{ color: '#000' }}
                                onClick={handleNoClick}
                            >
                                No
                            </button>
                            <button type="button" className="btn btn-primary btn-sm" onClick={handleOkClick}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export type ConfirmProps = Omit<ConfirmDialogProps, 'close'>;

const confirm = (props: ConfirmProps): void => {
    const divTarget = document.createElement('div');
    divTarget.id = 'react-confirm-alert-id';
    document.body.appendChild(divTarget);

    const close = () => {
        const unmountResult = ReactDOM.unmountComponentAtNode(divTarget);
        if (unmountResult && divTarget.parentNode) {
            divTarget.parentNode.removeChild(divTarget);
        }
    };

    function render() {
        setTimeout(() => {
            ReactDOM.render(<ConfirmDialog {...props} close={close} />, divTarget);
        });
    }
    render();
};
export default confirm;
