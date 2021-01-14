const stringToHslColor = (str: string, s: number, l: number): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};

const getInitials = (name: string): string => {
    return name
        .replace(/\s+/, ' ')
        .split(' ')
        .slice(0, 2)
        .map((v) => v[0])
        .join('')
        .toUpperCase();
};

const makeHash = (name = '?'): number => {
    let hash = 0,
        i,
        chr;
    if (name.length === 0) return hash;
    for (i = 0; i < name.length; i++) {
        chr = name.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

export { stringToHslColor, getInitials, makeHash };
