import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '../Button';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import './index.scss';

interface ConfirmDialogProps {
    title?: string;
    content?: string;
    okText?: string;
    cancelText?: string;
    icon?: React.ReactNode;
    close: () => void;
    onOk: () => void;
    onCancel?: () => void;
}

const contentPrefixCls = 'react-confirm-alert';

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    title,
    content,
    icon,
    close,
    onOk,
    onCancel = () => {
        /*ignore*/
    },
    okText = 'Yes',
    cancelText = 'Cancel',
}) => {
    const [ref] = useOnClickOutside(close);

    const handleNoClick = () => {
        if (onCancel) {
            onCancel();
        }
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
                        {title === undefined ? null : (
                            <span className={`${contentPrefixCls}-title`}>
                                {title}
                            </span>
                        )}
                        <div className={`${contentPrefixCls}-content`}>
                            {content}
                        </div>
                        <div className={`${contentPrefixCls}-btns`}>
                            <Button
                                htmlType="button"
                                type="light"
                                onClick={handleNoClick}
                                label={cancelText}
                            />
                            <Button
                                htmlType="button"
                                onClick={handleOkClick}
                                label={okText}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ConfirmDialog.displayName = 'ConfirmDialog';

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
            ReactDOM.render(
                <ConfirmDialog {...props} close={close} />,
                divTarget,
            );
        });
    }
    render();
};
export default confirm;
