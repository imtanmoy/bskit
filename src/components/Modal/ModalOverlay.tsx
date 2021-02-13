import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { css } from '@emotion/react';

interface ModalOverlayProps {
    visible: boolean;
    className: string;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ visible, className }) => {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    css={css`
                        background: rgba(0, 0, 0, 0.5);
                        position: fixed;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: -1;
                    `}
                    key="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                />
            )}
        </AnimatePresence>
    );
};

export default ModalOverlay;
