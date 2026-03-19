const { When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const Logger = require('../../src/utils/Logger');

When('I call search API with {string}', async function (term) {
  Logger.info(`Calling API with term: ${term}`);
  this.response = await this.api.get(`https://openlibrary.org/search.json?q=${term}`);
  this.body = await this.response.json();
  Logger.info(`API Response Status: ${this.response.status()}`);
});

Then('the response status should be 200', async function () {
  assert.strictEqual(this.response.status(), 200);
});

Then('the response should be valid JSON', async function () {
  assert.ok(typeof this.body === 'object', 'Response is not JSON');
});

Then('numFound should be greater than 0', async function () {
  assert.ok(typeof this.body.numFound === 'number', 'numFound is not a number');
  assert.ok(this.body.numFound > 0, 'numFound is not greater than 0');
});

Then('docs should be a non-empty array', async function () {
  assert.ok(Array.isArray(this.body.docs), 'docs is not an array');
  assert.ok(this.body.docs.length > 0, 'docs array is empty');
});

Then('the first 5 docs should have valid title and author', async function () {
  const docs = this.body.docs;

  for (let i = 0; i < Math.min(5, docs.length); i++) {
    const doc = docs[i];

    assert.ok(doc.title && doc.title.trim().length > 0, `Title missing at index ${i}`);
    
    if (doc.author_name) {
      assert.ok(Array.isArray(doc.author_name), 'author_name is not array');

      const hasValidAuthor = doc.author_name.some(name => name && name.trim().length > 0);
      assert.ok(hasValidAuthor, `Author invalid at index ${i}`);
    }
  }
});

Then('numFound should be zero or more', async function () {
  assert.ok(typeof this.body.numFound === 'number');
  assert.ok(this.body.numFound >= 0);
});

Then('docs should be empty or valid', async function () {
  assert.ok(Array.isArray(this.body.docs), 'docs is not an array');

  if (this.body.docs.length > 0) {
    const doc = this.body.docs[0];
    assert.ok(doc.title, 'Doc missing title');
  }
});