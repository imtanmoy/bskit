import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { storiesOf } from '@storybook/react';

import Modal from './index';

export default {
    title: 'Example/Modal',
    component: Modal,
} as Meta;

export const ModalExample: React.FC = () => {
    const [visible, setVisible] = React.useState(false);

    const onOpenModal = () => setVisible(true);
    const onCloseModal = () => setVisible(false);

    const onEscKeyDown = () => {
        console.log('esc');
    };

    return (
        <div>
            <button
                onClick={() => {
                    onOpenModal();
                }}
            >
                Open
            </button>
            <div style={{ height: '5000px' }}></div>
            <Modal
                visible={visible}
                onClose={onCloseModal}
                onEscKeyDown={onEscKeyDown}
            >
                <h1>Modal Body</h1>
                <button onClick={onCloseModal}>close</button>
            </Modal>
        </div>
    );
};
