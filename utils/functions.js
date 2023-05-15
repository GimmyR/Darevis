const arrayToObject = function(table) {
    return JSON.parse(JSON.stringify(table));
};

export default arrayToObject;