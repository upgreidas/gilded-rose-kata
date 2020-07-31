const { Shop, Item } = require('../src');

describe('Gilded Rose', () => {
  let shop;

  const createShop = (item, sellIn = 15, quality = 20) => {
    const firstItem = new Item(item, sellIn, quality);

    return new Shop([firstItem]);
  };

  const getFirstItem = () => shop.items[0];

  it('decreases quality and sellIn by 1', () => {
    shop = createShop('Magic Stick');

    shop.updateQuality();

    expect(getFirstItem().sellIn).toBe(14);
    expect(getFirstItem().quality).toBe(19);
  });

  it('decreases quality by 2 when sellIn date has passed', () => {
    shop = createShop('Magic Stick', 0);

    shop.updateQuality();

    expect(getFirstItem().quality).toBe(18);
  });

  it('does not decrease quality below 0', () => {
    shop = createShop('Magic Stick', 10, 0);

    shop.updateQuality();

    expect(getFirstItem().quality).toBe(0);
  });

  it('increases quality of Aged Brie by 1', () => {
    shop = createShop('Aged Brie');

    shop.updateQuality();

    expect(getFirstItem().quality).toBe(21);
  });

  it('increases quality of Aged Brie by 2 when sellIn value is below 0', () => {
    shop = createShop('Aged Brie', 0);

    shop.updateQuality();

    expect(getFirstItem().quality).toBe(22);
  });

  it('does not increase quality above 50', () => {
    shop = createShop('Aged Brie', 0, 50);

    shop.updateQuality();

    expect(getFirstItem().quality).toBe(50);
  });

  it('increases quality of backstage pass by 1', () => {
    shop = createShop('Backstage passes to a TAFKAL80ETC concert');

    shop.updateQuality();

    expect(getFirstItem().quality).toBe(21);
  });

  it('increases quality of backstage pass by 2 when sellIn value is 10 or less', () => {
    shop = createShop('Backstage passes to a TAFKAL80ETC concert', 10);

    shop.updateQuality();

    expect(getFirstItem().quality).toBe(22);
  });

  it('increases quality of backstage pass by 3 when sellIn value is 5 or less', () => {
    shop = createShop('Backstage passes to a TAFKAL80ETC concert', 5);

    shop.updateQuality();

    expect(getFirstItem().quality).toBe(23);
  });

  it('set quality of backstage pass to 0 when sellIn value is below 0', () => {
    shop = createShop('Backstage passes to a TAFKAL80ETC concert', 0);

    shop.updateQuality();

    expect(getFirstItem().quality).toBe(0);
  });

  it('does not alter values of legendary item', () => {
    shop = createShop('Sulfuras, Hand of Ragnaros', 10, 80);

    shop.updateQuality();

    expect(getFirstItem().sellIn).toBe(10);
    expect(getFirstItem().quality).toBe(80);
  });

  it('decreases quality of conjured item by 2', () => {
    shop = createShop('Conjured Magic Stick');

    shop.updateQuality();

    expect(getFirstItem().quality).toBe(18);
  });

  it('decreases quality of conjured item by 4 when sellIn value is less than 0', () => {
    shop = createShop('Conjured Magic Stick', 0);

    shop.updateQuality();

    expect(getFirstItem().quality).toBe(16);
  });
});
