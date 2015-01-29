# Expect-dom

[![Sauce Test Status][sauce-image]][sauce-url]

[sauce-image]: https://saucelabs.com/browser-matrix/lijunle_expect-dom.svg
[sauce-url]: https://saucelabs.com/u/lijunle_expect-dom

A set of additional assertions for the [expect.js][1] assertion library to help
when testing web applications. The assertions verify the existence and state
of DOM elements on the page.

[1]: https://github.com/Automattic/expect.js

This project was derived from the jasmine-jquery project (many thanks to the
creators of that project). Unlike jasmine-jquery, expect-dom is not tied to the
Jasmine testing framework. Instead, it builds on expect.js, which works with
Mocha as well as other testing frameworks.

## Installing expect-dom

To use expect-dom, simply add a script tag referencing the library. Be sure to
include it after expect.js, eg

```html
<script src="expect.js"></script>
<script src="expect-dom.js"></script>
```

expect-dom should work on any browser supported by expect.js. So far it's been
tested on Chrome 17, Safari 5.1, and Firefox 9, with more to come.

### Dependencies

The expect-dom itself only depends on `expect.js` and no others.

While you can pass jQuery object to `expect()` function, they will be extracted
into pure DOM for assertion.

## Assertions

expect-dom adds the following assertions:

`attr`: asserts that an attribute is present, and optionally checks its value.

```js
//Asserts the presence of the title attribute
var $div = $('<div title="some title"></div>');
expect($div).to.have.attr("title"); // jQuery object
expect($div.get(0)).to.have.attr("title"); // pure DOM element, both are fine

//Asserts the value of the title attribute
expect($('<div title="some title"></div>')).to.have.attr("title", "some title");
```

`id`: asserts that the ID of the element matches.

```js
expect($('<div id="somediv"></div>')).to.have.id("somediv");
expect($('<div id="somediv"></div>')).not.to.have.id("anotherdiv");
```

`html`: asserts that the HTML child content of an element matches (tags casing
differences will be ignored).

```js
expect($("<p><span>content</span></p>")).to.have.html("<span>content</span>");
```

`text`: asserts that the text content of an element matches. If `text` is
RegExp, assert the text content matches the RegExp.

```js
// assert text exactly matched
expect($('<span>some text</span>')).to.have.text("some text");

// assert text match RegExp
expect($('<span>some text</span>')).to.have.text(/\btext\b/);
```

`value`: asserts that the value of form element matches.

```js
expect($('<option>aValue</option>')).to.have.value("aValue");
```

`data`: asserts that the jQuery object data.

*Note*, this assertion will throw an exception if provided expect is pure DOM.

```js
var $span = $('<span data-name="somedata">junk</span>');
$span.data('key', 'value');

// assert on have data key
expect($span).to.have.data('key');  

// assert on data key equal some value
expect($span).to.have.data('key', 'data');
```

`visible`: asserts that an element is visible.

```js
expect($(theEl)).to.be.visible();
```

`hidden`: asserts that an element is hidden.

```js
expect($(theEl)).to.be.hidden();
```

`selected`: asserts that a form element is selected.

```js
expect($('<option selected="selected">aValue</option>')).to.be.selected();  
```

`checked`: asserts that a checkbox form element is checked.

```js
expect($('<input type="checkbox" checked="checked" />')).to.be.checked();  
```

`empty`: asserts that the content of an element is empty.

```js
expect($('<span></span>')).to.be.empty();  
```

`exist`: asserts that an element exists.

```js
expect($('body')).to.exist();  
```

`matchSelector`: assert that an element matches the specified selector.

```js
expect($('<span></span>')).to.matchSelector(':empty');  
```

`containChild`: asserts that an element contains a child matching the specified
selector.

```js
var $div = $('<div><span id="child">this is child</span></div>')
expect($div).to.containChild('#child');  
```

`disabled`: asserts that an element is disabled.

```js
expect($('<select disabled="disabled"></select>')).to.be.disabled();  
```

## License

MIT License.
