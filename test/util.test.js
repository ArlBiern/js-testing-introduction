const { generateText } = require('../util');

test('Should output name and ange', () => {
  let text = generateText('Terry', 45);
  expect(text).toBe('Terry (45 years old)');
});

test('Output should contain input data', () => {
  let textFirstOption = generateText('', null);
  expect(textFirstOption).toBe(' (null years old)');

  let textScndOption = generateText(null, '');
  expect(textScndOption).toBe('null ( years old)');
});

test('Check output with no data provided', () => {
  let text = generateText();
  expect(text).toBe(`undefined (undefined years old)`);
});