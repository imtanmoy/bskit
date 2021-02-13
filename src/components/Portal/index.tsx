import {
    forwardRef,
    useRef,
    useImperativeHandle,
    useLayoutEffect,
    ReactNode,
    ForwardRefExoticComponent,
} from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    id?: string;
    className?: string;
}

const Portal: ForwardRefExoticComponent<PortalProps> = forwardRef<
    unknown,
    PortalProps
>(({ children, id, className }, ref) => {
    const containerRef = useRef<HTMLElement>();

    useImperativeHandle(ref, () => ({}));

    const initRef = useRef(false);
    if (!initRef.current) {
        const div = document.createElement('div');
        if (id) {
            div.id = id;
        }
        if (className) {
            div.className = className;
        }
        containerRef.current = div;
        initRef.current = true;
    }

    useLayoutEffect(() => {
        const wrapper = containerRef.current;
        if (!wrapper || typeof document === 'undefined') {
            return;
        }
        document.body.appendChild(wrapper);
        return () => {
            document.body.removeChild(wrapper);
        };
    }, []);

    return containerRef.current
        ? createPortal(children, containerRef.current)
        : null;
});

Portal.displayName = 'Portal';

export default Portal;
