
(function() {
  function assert(self, truth, msg, error) {
    self.assert(truth,
      function () { return msg; },
      function () { return error; });
  }

  var assertions = {
    cssclass: function(className) {
      assert(this, this.obj.hasClass(className),
        "Expected element to have class " + className,
        "Expected element to not have class " + className);
    },

    attr: function(attrName, expectedValue) {
      if (expectedValue)
        assert(this, this.obj.attr(attrName) == expectedValue,
          "Expected element to have attribute '" + attrName + "' with value '" + expectedValue + "'",
          "Expected element to have attribute '" + attrName + "' with value other than '" + expectedValue + "'");
      else
        assert(this, this.obj.attr(attrName),
          "Expected element to have attribute " + attrName,
          "Expected element to not have attribute " + attrName);
    },

    id: function(id) {
      assert(this, this.obj.attr("id") === id,
        "Expected element to have id '" + id + "'",
        "Expected element to not have id '" + id + "'");
    },

    html: function(html) {
      var actualHtml = this.obj.html();
      assert(this, actualHtml === normalizeHtmlTagCase(html),
        "Expected element to have html '" + html + "' but had '" + actualHtml + "'",
        "Expected element to not have html '" + actualHtml + "'");
    },

    text: function(text) {
      var actualText = this.obj.text();
      if (text instanceof RegExp)
        assert(this, text.test(this.obj.text()),
          "Expected element text '" + actualText + "' to match regex '" + text.source + "'",
          "Expected element text '" + actualText + "' to not match regex '" + text.source + "'");
      else
        assert(this, actualText === text,
          "Expected element to have text '" + text + "' but had '" + actualText + "'",
          "Expected element to not have text '" + actualText + "'");
    },

    value: function(value) {
      var actualValue = this.obj.val();
      assert(this, actualValue === value,
        "Expected element to have value '" + value + "' but had '" + actualValue + "'",
        "Expected element to not have value '" + actualValue + "'");
    },

    data: function(key, expectedValue) {
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
      assert(this, this.obj.is(":visible"),
        "Expected element to be visible",
        "Expected element to not be visible");
    },

    hidden: function() {
      assert(this, this.obj.is(":hidden"),
        "Expected element to be hidden",
        "Expected element to not be hidden");
    },

    selected: function() {
      assert(this, this.obj.is(":selected"),
        "Expected element to be selected",
        "Expected element to not be selected");
    },

    checked: function() {
      assert(this, this.obj.is(":checked"),
        "Expected element to be checked",
        "Expected element to not be checked");
    },

    empty: function() {
      assert(this, this.obj.is(":empty"),
        "Expected element to be empty",
        "Expected element to not be empty");
    },

    exist: function() {
      assert(this, this.obj.size() > 0,
        "Expected element to exist",
        "Expected element to not exist");
    },

    matchSelector: function(selector) {
      assert(this, this.obj.is(selector),
        "Expected element to match selector '" + selector + "'",
        "Expected element to not match selector '" + selector + "'");
    },

    containChild: function(selector) {
      assert(this, this.obj.find(selector).size() > 0,
        "Expected element to contain child '" + selector + "'",
        "Expected element to not contain child '" + selector + "'");
    },

    disabled: function() {
      assert(this, this.obj.is(":disabled"),
        "Expected element to be disabled",
        "Expected element to not be disabled");
    },

    handle: function(eventName) {
      var events = this.obj.data("events");
      assert(this, events && events[eventName] && events[eventName].length > 0,
        "Expected element to handle event '" + eventName + "'",
        "Expected element to not handle event '" + eventName + "'");
    },

    handleWith: function(eventName, eventHandler) {
      var stack = this.obj.data("events")[eventName];
      if (!stack)
        assert(this, false, "No events bound for '" + eventName + "'");

      var i;
      for (i = 0; i < stack.length; i++) {
        if (stack[i].handler === eventHandler) {
          return;
        }
      }

      assert(this, false, "No matching handler found for '" + eventName + "'");
    }
  };

  normalizeHtmlTagCase = function(html) {
    return $('<div/>').append(html).html();
  };

  if (typeof(expect) !== "undefined") {
    var assertionProtype;
    if (typeof(expect.Assertion) !== "undefined")
      assertionPrototype = expect.Assertion.prototype;

    for (var assertion in assertions) {
      if (!assertionPrototype[assertion.name])
        assertionPrototype[assertion] = assertions[assertion];
    }
  }
})();
