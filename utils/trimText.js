function trimText(text, maxLength = 80) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else {
        return text;
    }
}

module.exports = trimText;
