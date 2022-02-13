
module.exports = word => {
    const m = new Map();
    [...word].forEach(e => {
        if(m.has(e)) {
            m.set(e, m.get(e) + 1);
        }
        else{
            m.set(e, 1);
        }
    });
    return m;
}