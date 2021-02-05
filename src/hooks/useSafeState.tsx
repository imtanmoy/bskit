import { SetStateAction, useRef, useState, Dispatch, useEffect } from 'react';

const useStateSafe = function <T>(
    initialState: T,
): [T, Dispatch<SetStateAction<T>>] {
    const isMounted = useRef(false);
    const [state, setState] = useState<T>(initialState);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    });

    const setStateSafe = (t: T | ((prev: T) => T)) => {
        if (isMounted.current) {
            setState(t);
        }
    };

    return [state, setStateSafe];
};

export default useStateSafe;
