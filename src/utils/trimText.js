function trimText(text, maxLength = 80) {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
}

module.exports = trimText;
