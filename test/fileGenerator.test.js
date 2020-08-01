const fs = require('fs');
const { join } = require('path');

const { Shop, Item } = require('../src');
const { countFileLines, createTransformStream } = require('../src/helpers');

describe('File Generator', () => {
  const inputItems = [
    new Item('Conjured Magic Stick', 3, 30),
    new Item('Sulfuras, Hand of Ragnaros', 10, 80),
    new Item('Backstage passes to a TAFKAL80ETC concert', 12, 10),
    new Item('Aged Brie', 4, 10),
    new Item('Magic Stick', 2, 4),
  ];

  const outputItems = [];

  const inputFile = join(__dirname, 'input');
  const outputFile = join(__dirname, 'output');

  afterAll(() => {
    fs.unlinkSync(inputFile);
    fs.unlinkSync(outputFile);
  });

  it('generates item file and counts it\'s lines', async () => {
    let content = '';

    inputItems.forEach((item) => {
      content += `${item.name}#${item.quality}#${item.sellIn}\n`;
    });

    fs.writeFileSync(inputFile, content, 'utf8');

    const lineCount = await countFileLines(inputFile);
    expect(lineCount).toBe(inputItems.length);
  });

  it('generates output file', async () => {
    const transformFunction = (input) => {
      const item = new Item(input[0], input[2], input[1]);

      Shop.updateSingleItem(item, 7);

      input[1] = item.quality;
      input[2] = item.sellIn;

      outputItems.push(item);

      return input;
    };

    await createTransformStream(inputFile, outputFile, transformFunction);

    expect(fs.existsSync(outputFile)).toBe(true);
  });

  it('validates output file', async () => {
    let content = '';

    outputItems.forEach((item) => {
      content += `${item.name}#${item.quality}#${item.sellIn}\n`;
    });

    const outputContent = fs.readFileSync(outputFile, 'utf8');

    expect(outputContent).toBe(content);
  });
});
