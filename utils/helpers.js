export function arrayToObject(table) {
    return JSON.parse(JSON.stringify(table));
}

export function castToString(str) {
    if(str == null)
        return "";
    else return str + "";
}

export function addZeroBefore(str) {
    while(str.length < 2)
        str = "0" + str;
    return str;
}