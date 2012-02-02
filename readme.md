# Expect-dom

A set of additional assertions for the expect.js assertion library to help when testing web
applications. The assertions verify the existence and state of DOM elements on the page. 

This project was derived from the jasmine-jquery project (many thanks to the creators of that project). 
Unlike jasmine-jquery, expect-dom is not tied to the Jasmine testing framework. Instead, it builds on 
expect.js, which works with Mocha as well as other testing frameworks.


## Installing expect-dom

To use expect-dom, simply add a script tag referencing the library. Be sure to include it
after expect.js, eg


```html
<script src="expect.js"></script>
<script src="expect-dom.js"></script>
```

expect-dom should work on any browser supported by expect.js. So far it's been tested on Chrome 17,
Safari 5.1, and Firefox 9, with more to come.

### Dependencies

expect-dom requires either jQuery (tested against version 1.7) or Zepto.js 
(tested against version 0.8).


## Assertions
expect-dom adds the following assertions:

`attr`: asserts that an attribute is present, and optionally checks its value

```js
//Asserts the presence of the title attribute
expect($('<div title="some title"></div>')).to.have.attr("title");  

//Asserts the value of the title attribute
expect($('<div title="some title"></div>')).to.have.attr("title", "some title");
```

`id`: asserts that the ID of the element matches

```js
expect($('<div id="somediv"></div>')).to.have.id("somediv");  
expect($('<div id="somediv"></div>')).not.to.have.id("anotherdiv");  
```

`html`: asserts that the HTML child content of an element matches (tags casing differences are ignored)

```js
expect($(theEl)).to.have.html("<span>content</span>");  
```

`text`: asserts that the text content of an element matches

```js
expect($('<span>some text</span>')).to.have.text("some text");  
```

`value`: asserts that the value of form element matches

```js
expect($('<option>aValue</option>')).to.have.value("aValue");  
```

`data`: asserts that the data value of an element matches

```js
expect($('<span data-name="somedata">junk</span>')).to.have.data("somedata");  
```

`visible`: asserts that an element is visible

```js
expect($(theEl)).to.be.visible();  
```

`hidden`: asserts that an element is hidden

```js
expect($(theEl)).to.be.hidden();  
```

`selected`: asserts that a form element is selected

```js
expect($('<option selected="selected">aValue</option>')).to.be.selected();  
```

`checked`: asserts that a checkbox form element is checked

```js
expect($('<input type="checkbox" checked="checked" />')).to.be.checked();  
```

`empty`: asserts that the content of an element is empty

```js
expect($('<span></span>')).to.be.empty();  
```

`exist`: asserts that an element exists

```js
expect($('body')).to.exist();  
```

`matchSelector`: assert that an element matches the specified selector

```js
expect($('<span></span>')).to.matchSelector(':empty');  
```

`containChild`: asserts that an element contains a child matching the specified selector

```js
expect($(theEl)).to.containChild('#aChildEl');  
```

`disabled`: asserts that an element is disabled 

```js
expect($('<select disabled='disabled'></select>')).to.be.disabled();  
```

`handle`: asserts that the specified event on an element is handled
    
```js
$('#clickme').bind("click", handler);
expect($('#clickme')).to.handle("click");
```

`handleWith`: asserts that the specified event on an element is handled by the specified handler

```js
var handler = function(){ };

$('#clickme').bind("click", handler);
expect($('#clickme')).to.handleWith("click", handler);
```

## Notes
expect-dom includes equivalents for all the matchers from jasmine-jquery except toHaveBeenTriggeredOn




