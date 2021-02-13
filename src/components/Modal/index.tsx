import * as React from 'react';
import { useScrollLock } from '../../hooks/useScrollLock';
import Portal from '../Portal';
import './index.scss';
import ModalContainer from './ModalContainer';
import ModalOverlay from './ModalOverlay';

const classes = {
    root: 'react-responsive-modal-root',
    overlay: 'react-responsive-modal-overlay',
    overlayAnimationIn: 'react-responsive-modal-overlay-in',
    overlayAnimationOut: 'react-responsive-modal-overlay-out',
    modalContainer: 'react-responsive-modal-container',
    modalContainerCenter: 'react-responsive-modal-containerCenter',
    modal: 'react-responsive-modal-modal',
    modalAnimationIn: 'react-responsive-modal-modal-in',
    modalAnimationOut: 'react-responsive-modal-modal-out',
    closeButton: 'react-responsive-modal-closeButton',
};

export interface ModalProps {
    visible: boolean;
    center?: boolean;
    closeOnEsc?: boolean;
    closeOnOverlayClick?: boolean;
    onClose: () => void;
    onEscKeyDown?: (event: KeyboardEvent) => void;
    role?: string;
    onOverlayClick?: (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => void;
    blockScroll?: boolean;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    visible,
    center,
    onEscKeyDown,
    onClose,
    closeOnEsc = true,
    onOverlayClick,
    closeOnOverlayClick = true,
    role = 'dialog',
    blockScroll = true,
    children,
}) => {
    const refModal = React.useRef<HTMLDivElement>(null);
    const refShouldClose = React.useRef<boolean | null>(null);

    useScrollLock(refModal, visible, blockScroll);

    const handleClickOverlay = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        if (refShouldClose.current === null) {
            refShouldClose.current = true;
        }

        if (!refShouldClose.current) {
            refShouldClose.current = null;
            return;
        }

        onOverlayClick?.(event);

        if (closeOnOverlayClick) {
            onClose();
        }

        refShouldClose.current = null;
    };

    const handleOnClose = React.useCallback(() => {
        onClose();
    }, [onClose]);

    const handleKeydown = React.useCallback(
        (event: KeyboardEvent) => {
            if (event.key !== 'Escape') {
                return;
            }

            onEscKeyDown?.(event);

            if (closeOnEsc) {
                handleOnClose();
            }
        },
        [closeOnEsc, handleOnClose, onEscKeyDown],
    );

    const handleModalEvent = () => {
        refShouldClose.current = false;
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [handleKeydown]);

    const modalAnimation = visible
        ? classes.modalAnimationIn
        : classes.modalAnimationOut;

    return visible ? (
        <Portal className={classes.root} id={'modal-root'}>
            <ModalOverlay className={classes.overlay} visible={visible} />
            <ModalContainer
                ref={refModal}
                onClick={handleClickOverlay}
                center={center}
            >
                <div
                    className={classes.modal}
                    style={{
                        animation: `${modalAnimation} 300ms`,
                    }}
                    onMouseDown={handleModalEvent}
                    onMouseUp={handleModalEvent}
                    onClick={handleModalEvent}
                    // onAnimationEnd={handleAnimationEnd}
                    // id={modalId}
                    role={role}
                    aria-modal="true"
                    // aria-labelledby={ariaLabelledby}
                    // aria-describedby={ariaDescribedby}
                    data-testid="modal"
                >
                    {children}
                </div>
            </ModalContainer>
        </Portal>
    ) : null;
};

export default Modal;
