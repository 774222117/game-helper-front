var onekeyfunDomin = decodeUtf8(encodeUtf8('https://gsource.sgsugou.com/app'));
var onekeyfunDomin2 = 'https://source.sgsugou.com/app';
var onekeyfunDomin1 = 'https://api.we4game.com/app';

function decodeUtf8(bytes) {
    var encoded = "";
    for (var i = 0; i < bytes.length; i++) {
    encoded += '%' + bytes[i].toString(16);
    }
    return decodeURIComponent(encoded);
}
function encodeUtf8(text) {
    const code = encodeURIComponent(text);
    const bytes = [];
    for (var i = 0; i < code.length; i++) {
    const c = code.charAt(i);
    if (c === '%') {
    const hex = code.charAt(i + 1) + code.charAt(i + 2);
    const hexVal = parseInt(hex, 16);
    bytes.push(hexVal);
    i += 2;
    } else bytes.push(c.charCodeAt(0));
    }
    return bytes;
}