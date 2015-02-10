# Expect-dom

[![Sauce Test Status][sauce-image]][sauce-url]

[sauce-image]: https://saucelabs.com/browser-matrix/lijunle_expect-dom.svg
[sauce-url]: https://saucelabs.com/u/lijunle_expect-dom

A plugin for the [expect.js][1] to assert on DOM elements with node or browser.

[1]: https://github.com/Automattic/expect.js

## Features:

- Cross-browser: works on IE8+, Firefox, Safari, Chrome, Opera.
- Node.JS ready: `require('expect.js')`.
- Single dependency with `expect.js`.

## Install

### Node

Install from NPM:

```shell
$ npm install expect-dom expect-dom.js --save-dev
```

Then:

```js
var expect = require('expect.js');
expect = require('expect-dom.js')(expect);
```

## Browser

```html
<script src="expect.js"></script>
<script src="expect-dom.js"></script>
```

## jQuery Object

When call `expect()` with jQuery object, the first item is extract and assert.

E.g., the following two code snippets are the same.

```js
var container = document.querySelector('.container');
expect(container).to.have.class('container');
```

```js
var $container = $('.container');
expect($container).to.have.class('container');
```

## API

**attr**: asserts presence of the attribute (and its value optionally)

```js
expect($('<div title="some title"></div>')).to.have.attr("title");
expect($('<div title="some title"></div>')).to.have.attr("title", "some title");
```

**id**: asserts the ID of the element.

```js
expect($('<div id="somediv"></div>')).to.have.id("somediv");
expect($('<div id="somediv"></div>')).not.to.have.id("anotherdiv");
```

**html**: asserts the HTML child content of an element matches (tags casing
differences will be ignored).

```js
expect($("<p><span>content</span></p>")).to.have.html("<span>content</span>");
```

**text**: asserts that the text content of an element matches. If `text` is
RegExp, assert the text content matches the RegExp.

```js
expect($('<span>some text</span>')).to.have.text('some text'); // plain text match
expect($('<span>some text</span>')).to.have.text(/\btext\b/); // RegExp match
```

**value**: asserts that the value of form element matches.

```js
expect($('<option>aValue</option>')).to.have.value("aValue");
```

**visible**: asserts that an element is visible.

```js
expect($('.visible')).to.be.visible();
```

**hidden**: asserts that an element is hidden.

```js
expect($('.hidden')).to.be.hidden();
```

**selected**: asserts that a form element is selected.

```js
expect($('<option selected="selected">aValue</option>')).to.be.selected();  
```

**checked**: asserts that a checkbox form element is checked.

```js
expect($('<input type="checkbox" checked="checked" />')).to.be.checked();  
```

**empty**: asserts that the content of an element is empty.

```js
expect($('<span></span>')).to.be.empty();  
```

**matchSelector**: assert that an element matches the specified selector.

```js
expect($('<span class="alert"></span>')).to.matchSelector('.alert');  
```

**containChild**: asserts that an element contains a child matching the specified
selector.

```js
expect($('<div><span id="child">this is child</span></div>')).to.containChild('#child');  
```

**disabled**: asserts that an element is disabled.

```js
expect($('<select disabled="disabled"></select>')).to.be.disabled();  
```

## Examples

TODO...

## Running tests

TODO...

## Differences with [kevindente/expect-dom][2]

[2]: https://github.com/kevindente/expect-dom

I requested kevindente to add support for pure DOM assertion and he didn't reply
my RP. So, I forked the project, and continuously made new features here.

My objective is to let this project work under both node and browser. If you get
any problem, please open an issue.

## License

MIT License.
