function canonicalStringify(value) {
    if (value === null || typeof value !== "object") {
        return JSON.stringify(value);
    }

    if (Array.isArray(value)) {
        return `[${value.map(canonicalStringify).join(",")}]`;
    }

    const keys = Object.keys(value).sort();

    const entries = keys.map((key) => {
        return `${JSON.stringify(key)}:${canonicalStringify(value[key])}`;
    });

    return `{${entries.join(",")}}`;
}

export default canonicalStringify;