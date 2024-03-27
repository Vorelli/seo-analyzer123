import test from 'ava';
import ATagWithRelAttributeRule from '../../src/rules/ATagWithRelAttributeRule';

const fakeDOM = (links = []) => ({
  window: {
    document: {
      querySelectorAll: () => links
    }
  }
});

test('if a tag without rel attribute, return "There are 2 <a> tag without rel attribute"', async t => {
  const links = [
    { tagName: 'a' },
    { tagName: 'a' }
  ];
  const result = await ATagWithRelAttributeRule(fakeDOM(links));
  t.is(result, 'There are 2 <a> tags without a rel attribute');
});

test('if a tags exists rel attribute, return "null"', async t => {
  const links = [
    { tagName: 'a', rel: 'Rel' },
    { tagName: 'a', rel: 'Rel' }
  ];
  const result = await ATagWithRelAttributeRule(fakeDOM(links));
  t.is(result, null);
});
