export function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const check = escapeXml(`a&b<c>d"e'f`);

if (check !== 'a&amp;b&lt;c&gt;d&quot;e&apos;f') {
  throw new Error('escapeXml broke');
}
