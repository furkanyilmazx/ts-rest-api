import fs from 'fs';

export const LINE_BREAK = /\r?\n/;

describe('translations', () => {
  const trLanguageFileName = 'tr';
  const enLanguageFileName = 'en';
  const objectSplitter = ':';

  function getLines(fileName: string) {
    const lines = fs
      .readFileSync(`${__dirname}/../${fileName}.json`)
      .toString()
      .split(LINE_BREAK);

    return lines.slice(lines.indexOf('{') + 1, lines.indexOf('};'));
  }

  it('should have same key name on same line', () => {
    const itLines = getLines(trLanguageFileName);
    const enLines = getLines(enLanguageFileName);

    itLines.forEach((itLine, i) => {
      const [itObjectKey] = itLine.split(objectSplitter);
      const [enObjectKey] = enLines[i].split(objectSplitter);

      if (itObjectKey !== enObjectKey) {
        console.warn(
          `Something is wrong with the translation file, 
          please check if translation files are updated `
        );
      }

      expect(itObjectKey).toBe(enObjectKey);
    });
  });
});
