exports.normalizeData = (data) => data.map(row => {
    const normalizedRow = {};
    for (const key in row) {
        const value = row[key];
        normalizedRow[key] = typeof value === 'bigint' ? Number(value) : value;
    }
    return normalizedRow;
});
