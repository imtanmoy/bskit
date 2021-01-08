import { useState, useRef, useEffect, useCallback, SetStateAction, Dispatch, RefObject } from 'react';

const useVisible: (
    initialIsVisible: boolean,
) => {
    ref: any;
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>;
} = (initialIsVisible) => {
    const [isVisible, setIsVisible] = useState<boolean>(initialIsVisible);
    const ref: RefObject<HTMLElement> = useRef<HTMLElement>(null);

    const escapeListener = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsVisible(false);
        }
    }, []);

    const handleEvent = useCallback(
        (event: any) => {
            if (ref && event) {
                const { current } = ref;
                const { target } = event;
                if (current && target) {
                    if (!current.contains(event.target)) {
                        setIsVisible(false);
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

    return { ref, isVisible, setIsVisible };
};

export default useVisible;
