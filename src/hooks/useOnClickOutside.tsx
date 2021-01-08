import { useRef, useEffect, useCallback, RefObject } from 'react';

const useOnClickOutside: (handler: () => void) => [any] = (handler) => {
    const ref: RefObject<HTMLElement> = useRef<HTMLElement>(null);

    const escapeListener = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            handler();
        }
    }, []);

    const handleEvent = useCallback(
        (event: any) => {
            if (ref && event) {
                const { current } = ref;
                const { target } = event;
                if (current && target) {
                    if (!current.contains(event.target)) {
                        handler();
                    }
                }
            }
        },
        [ref.current],
    );

    useEffect(() => {
        document.addEventListener('click', handleEvent, true);
        document.addEventListener('keyup', escapeListener, true);
        return () => {
            document.removeEventListener('click', handleEvent, true);
            document.removeEventListener('keyup', escapeListener, true);
        };
    }, []);

    return [ref];
};

export default useOnClickOutside;
