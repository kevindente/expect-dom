
(function() {
  function DOM(obj) {
    if (!(this instanceof DOM)) return new DOM(obj);

    if (obj && obj.tagName) {
      this.element = obj;
    } else if (obj && obj.jquery) {
      this.element = obj.get(0);
    } else {
      throw "Do you provide a DOM or jQuery object?";
    }
  }

  DOM.prototype.hasClass = function(className) {
    return (' ' + this.element.className + ' ').indexOf(' ' + className + ' ') !== -1;
  };

  DOM.prototype.getAttr = function (attrName) {
    var attr = this.element.attributes[attrName];
    return attr && attr.value;
  };

  DOM.prototype.getId = function () {
    return this.element.id;
  };

  DOM.prototype.getHtml = function () {
    return this.element.innerHTML;
  };

  DOM.prototype.getText = function () {
    return this.element.textContent || this.element.innerText;
  };

  DOM.prototype.getValue = function () {
    return this.element.value;
  };

  DOM.prototype.isVisible = function () {
    return this.element.offsetWidth || this.element.offsetHeight;
  };

  DOM.prototype.isSelected = function () {
    return this.element.selected;
  };

  DOM.prototype.isChecked = function () {
    return this.element.checked;
  };

  DOM.prototype.isEmpty = function () {
    return !this.element.firstChild;
  };

  DOM.prototype.doesExist = function () {
    return this.element;
  };

  DOM.prototype.doesMatch = function (selector) {
    var matchSelector = this.element.matches ||
                        this.element.webkitMatchesSelector ||
                        this.element.mozMatchesSelector ||
                        this.element.oMatchesSelector ||
                        this.element.msMatchesSelector ||
                        matchesPolyfill;

    return matchSelector.call(this.element, selector);
  };

  DOM.prototype.find = function (selector) {
    return this.element.querySelectorAll(selector);
  };

  DOM.prototype.isDisabled = function () {
    return this.element.disabled;
  };

  var assertions = {
    cssclass: function(className) {
      assert(this, DOM(this.obj).hasClass(className),
        "Expected element to have class " + className,
        "Expected element to not have class " + className);
    },

    attr: function(attrName, expectedValue) {
      if (expectedValue)
        assert(this, DOM(this.obj).getAttr(attrName) === expectedValue,
          "Expected element to have attribute '" + attrName + "' with value '" + expectedValue + "'",
          "Expected element to have attribute '" + attrName + "' with value other than '" + expectedValue + "'");
      else
        assert(this, DOM(this.obj).getAttr(attrName),
          "Expected element to have attribute " + attrName,
          "Expected element to not have attribute " + attrName);
    },

    id: function(id) {
      assert(this, DOM(this.obj).getId() === id,
        "Expected element to have id '" + id + "'",
        "Expected element to not have id '" + id + "'");
    },

    html: function(html) {
      var actualHtml = DOM(this.obj).getHtml();
      assert(this, actualHtml === normalizeHtml(html),
        "Expected element to have html '" + html + "' but had '" + actualHtml + "'",
        "Expected element to not have html '" + actualHtml + "'");
    },

    text: function(text) {
      var actualText = DOM(this.obj).getText();
      if (text instanceof RegExp)
        assert(this, text.test(actualText),
          "Expected element text '" + actualText + "' to match regex '" + text.source + "'",
          "Expected element text '" + actualText + "' to not match regex '" + text.source + "'");
      else
        assert(this, actualText === text,
          "Expected element to have text '" + text + "' but had '" + actualText + "'",
          "Expected element to not have text '" + actualText + "'");
    },

    value: function(value) {
      var actualValue = DOM(this.obj).getValue();
      assert(this, actualValue === value,
        "Expected element to have value '" + value + "' but had '" + actualValue + "'",
        "Expected element to not have value '" + actualValue + "'");
    },

    data: function(key, expectedValue) {
      if (!this.obj.jquery) {
        // object is pure DOM, throw not support exception
        throw "assert have.data on pure DOM is not supported.";
      }

      if (expectedValue)
        assert(this, this.obj.data(key) === expectedValue,
          "Expected element to have data '" + key + "' with value '" + expectedValue + "'",
          "Expected element to have data '" + key + "' with value other than '" + expectedValue + "'");
      else
        assert(this, this.obj.data(key) !== undefined,
          "Expected element to have data " + key,
          "Expected element to not have data " + key);
    },

    visible: function() {
      assert(this, DOM(this.obj).isVisible(),
        "Expected element to be visible",
        "Expected element to not be visible");
    },

    hidden: function() {
      assert(this, !DOM(this.obj).isVisible(),
        "Expected element to be hidden",
        "Expected element to not be hidden");
    },

    selected: function() {
      assert(this, DOM(this.obj).isSelected(),
        "Expected element to be selected",
        "Expected element to not be selected");
    },

    checked: function() {
      assert(this, DOM(this.obj).isChecked(),
        "Expected element to be checked",
        "Expected element to not be checked");
    },

    empty: function() {
      assert(this, DOM(this.obj).isEmpty(),
        "Expected element to be empty",
        "Expected element to not be empty");
    },

    exist: function() {
      assert(this, DOM(this.obj).doesExist(),
        "Expected element to exist",
        "Expected element to not exist");
    },

    matchSelector: function(selector) {
      assert(this, DOM(this.obj).doesMatch(selector),
        "Expected element to match selector '" + selector + "'",
        "Expected element to not match selector '" + selector + "'");
    },

    containChild: function(selector) {
      assert(this, DOM(this.obj).find(selector).length,
        "Expected element to contain child '" + selector + "'",
        "Expected element to not contain child '" + selector + "'");
    },

    disabled: function() {
      assert(this, DOM(this.obj).isDisabled(),
        "Expected element to be disabled",
        "Expected element to not be disabled");
    },
  };

  function normalizeHtml(html) {
    var element = document.createElement('div');
    element.innerHTML = html;
    return element.innerHTML;
  }

  function assert(self, truth, msg, error) {
    self.assert(truth,
      function () { return msg; },
      function () { return error; });
  }

  function matchesPolyfill(selector) {
    var element = this;
    var matches = (element.document || element.ownerDocument).querySelectorAll(selector);
    var i = 0;

    while (matches[i] && matches[i] !== element) {
      i++;
    }

    return matches[i] ? true : false;
  }

  if (typeof expect === "undefined" || typeof expect.Assertion !== "function") {
    throw "`expect` is not found. Do you forget to import expect.js?";
  }

  for (var assertion in assertions) {
    if (assertions.hasOwnProperty(assertion)) {
      expect.Assertion.prototype[assertion] = assertions[assertion];
    }
  }
})();
