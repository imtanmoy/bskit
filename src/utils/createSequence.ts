const createSequence: () => { next(): string } = () => {
    let start = 0;

    return {
        next(): string {
            return String(start++);
        },
    };
};

export default createSequence;
