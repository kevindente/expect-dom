
(function() {
  var assertions = {
    cssclass: function(className) {
      this.assert(this.obj.hasClass(className),
                  function() { return "Expected element to have class " + className; },
                  function() { return "Expected element to not have class " + className; });
    },

    attr: function(attrName, expectedValue) {
      if (expectedValue)
        this.assert(this.obj.attr(attrName) == expectedValue,
                    function() { return "Expected element to have attribute '" + attrName + "' with value '" + expectedValue + "'"; },
                    function() { return "Expected element to have attribute '" + attrName + "' with value other than '" + expectedValue + "'"; }
                   );
      else
        this.assert(this.obj.attr(attrName),
                    function() { return "Expected element to have attribute " + attrName; },
                    function() { return "Expected element to not have attribute " + attrName; }
                   );
    },

    id: function(id) {
      this.assert(this.obj.attr("id") === id,
                 function() { return "Expected element to have id '" + id + "'"; },
                 function() { return "Expected element to not have id '" + id + "'"; }
                 );
    },

    html: function(html) {
      this.assert(this.obj.html() === normalizeHtmlTagCase(html),
                  function() { return "Expected element to have html '" + html + "' but had '" + actualHtml + "'"; },
                  function() { return "Expected element to not have html '" + actualHtml + "'"; }
                 );
    },

    text: function(text) {
      var actualText = this.obj.text();
      if (text instanceof RegExp)
        this.assert(text.test(this.obj.text()),
                    function() { return "Expected element text '" + actualText + "' to match regex '" + text.source + "'"; },
                    function() { return "Expected element text '" + actualText + "' to not match regex '" + text.source + "'"; }
                   );
      else
        this.assert(actualText === text,
          function() { return "Expected element to have text '" + text + "' but had '" + actualText + "'"; },
          function() { return "Expected element to not have text '" + actualText + "'"; }
        );
    },

    value: function(value) {
      var actualValue = this.obj.val();
      this.assert(actualValue === value,
        function() { return "Expected element to have value '" + value + "' but had '" + actualValue + "'"; },
        function() { return "Expected element to not have value '" + actualValue + "'"; }
        );
    },

    data: function(key, expectedValue) {
      if (expectedValue)
        this.assert(this.obj.data(key) === expectedValue,
                    function() { return "Expected element to have data '" + key + "' with value '" + expectedValue + "'"; },
                    function() { return "Expected element to have data '" + key + "' with value other than '" + expectedValue + "'"; }
                   );
      else
        this.assert(this.obj.data(key) !== undefined,
                    function() { return "Expected element to have data " + key; },
                    function() { return "Expected element to not have data " + key; }
                   );
    },

    visible: function() {
      this.assert(this.obj.is(":visible"),
                  function() { return "Expected element to be visible"; },
                  function() { return "Expected element to not be visible"; }
                 );
    },

    hidden: function() {
      this.assert(this.obj.is(":hidden"),
                  function() { return "Expected element to be hidden"; },
                  function() { return "Expected element to not be hidden"; }
                 );
    },

    selected: function() {
      this.assert(this.obj.is(":selected"),
                  function() { return "Expected element to be selected"; },
                  function() { return "Expected element to not be selected"; }
                 );
    },

    checked: function() {
      this.assert(this.obj.is(":checked"),
                  function() { return "Expected element to be checked"; },
                  function() { return "Expected element to not be checked"; }
                 );
    },

    empty: function() {
      this.assert(this.obj.is(":empty"),
                  function() { return "Expected element to be empty"; },
                  function() { return "Expected element to not be empty"; }
                 );
    },

    exist: function() {
      this.assert(this.obj.size() > 0,
                  function() { return "Expected element to exist"; },
                  function() { return "Expected element to not exist"; }
                 );
    },

    matchSelector: function(selector) {
      this.assert(this.obj.is(selector),
                              function() { return "Expected element to match selector '" + selector + "'"; },
                              function() { return "Expected element to not match selector '" + selector + "'"; }
                             );
    },

    containChild: function(selector) {
      this.assert(this.obj.find(selector).size() > 0,
                  function() { return "Expected element to contain child '" + selector + "'"; },
                  function() { return "Expected element to not contain child '" + selector + "'"; }
                 );
    },

    disabled: function() {
      this.assert(this.obj.is(":disabled"),
                  function() { return "Expected element to be disabled"; },
                  function() { return "Expected element to not be disabled"; }
                 );
    },

    handle: function(eventName) {
      var events = this.obj.data("events");
      this.assert(events && events[eventName] && events[eventName].length > 0,
                  function() { return "Expected element to handle event '" + eventName + "'"; },
                  function() { return "Expected element to not handle event '" + eventName + "'"; }
                 );
    },

    handleWith: function(eventName, eventHandler) {
      var stack = this.obj.data("events")[eventName];
      if (!stack)
        this.assert(false, function() { return "No events bound for '" + eventName + "'"; });

      var i;
      for (i = 0; i < stack.length; i++) {
        if (stack[i].handler === eventHandler) {
          return;
        }
      }

      this.assert(false, function() { return "No matching handler found for '" + eventName + "'"; });
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
