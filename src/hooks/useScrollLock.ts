import * as React from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export const useScrollLock = (
    refModal: React.RefObject<HTMLElement>,
    enabled = true,
    blockScroll: boolean,
) => {
    const oldRef = React.useRef<Element | null>(null);

    console.log(refModal);

    React.useEffect(() => {
        if (enabled && refModal.current && blockScroll) {
            oldRef.current = refModal.current;
            disableBodyScroll(refModal.current);
        }
        return () => {
            if (oldRef.current) {
                enableBodyScroll(oldRef.current);
                oldRef.current = null;
            }
        };
    }, [enabled, refModal, blockScroll]);
};
