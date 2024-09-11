var he = require("he");

export function decodeHtmlEntities(htmlString: string): string {
  return he.decode(htmlString);
}