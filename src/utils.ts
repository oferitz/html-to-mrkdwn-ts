export const isWhiteSpaceOnly = (s: string) => !/\S/.test(s);

export const findFirstImageSrc = (html: string) => {
  const match = html.match(/<img.*?\s+src=(?:'|")([^'">]+)(?:'|")/)
  return match?.[1] || ''
}

/**
 * Split string, preserving specific newline used for each line
 */
export function splitSpecial(s: string) {
  const lines: { text: string, newLineChar: '\r' | '\n' | '\r\n' | '' }[] = [];
  const strLen = s.length;

  for (let i = 0, startPos = 0; i < strLen; ++i) {
    let char = s.charAt(i);
    let newLineChar: typeof lines[number]['newLineChar'] = '';

    if (char === '\r') newLineChar = (s.charAt(i + 1) === '\n') ? '\r\n' : char;
    else if (char === '\n') newLineChar = char;

    const endPos = newLineChar ? i :
      i === (strLen - 1) ? i + 1 :
        undefined;

    if (endPos === undefined) continue;

    lines.push({
      text: s.slice(startPos, endPos),
      newLineChar
    });

    startPos = endPos + newLineChar.length;
    if (newLineChar.length > 1) ++i;
  }

  return lines;
}

/**
 * Surround tag content with delimiter (moving any leading/trailing space to outside the tag
 */
export function tagSurround(content: string, surroundStr: string) {
  // If un-escaped surroundStr already occurs, remove all instances
  const nestedSurroundStrIndex = content.indexOf(surroundStr);
  if (nestedSurroundStrIndex >= 0)
    content = content.replace(
      new RegExp(`([^\\\\])\\${surroundStr.split('').join('\\')}`, 'gm'),
      '$1'
    );

  const lines = splitSpecial(content);
  let res = '';

  for (const { text, newLineChar } of lines) {
    let i: number = 0;
    let startPos: number | undefined = undefined;
    let endPos: number | undefined = undefined;

    while (i >= 0 && i < text.length) {
      if (/[\S]/.test(text[i])) {
        if (startPos === undefined) {
          startPos = i;
          i = text.length;
        } else {
          endPos = i;
          i = NaN;
        }
      }

      if (startPos === undefined) ++i;
      else --i;
    }

    // If whole string is non-breaking whitespace, don't surround it
    if (startPos === undefined) {
      res += text + newLineChar;
      continue;
    }

    if (endPos === undefined) endPos = text.length - 1;

    const leadingSpace = startPos > 0 ? text[startPos - 1] : '';
    const trailingSpace = endPos < (text.length - 1) ? text[endPos + 1] : '';

    const slicedText = text.slice(startPos, endPos + 1)

    res += leadingSpace + surroundStr + slicedText + surroundStr + trailingSpace + newLineChar;
  }

  return res;
}