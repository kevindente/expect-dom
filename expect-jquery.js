
(function() {
  var matchers = {
    
    //Note - can't use "class" as the method name because it's a reserved word
    cssclass: function(className) {
      this.assert(this.obj.hasClass(className));
    },

    attr: function(attrName, expectedValue) {
      if (expectedValue)
        this.assert(this.obj.attr(attrName) == expectedValue);
      else
        this.assert(this.obj.attr(attrName) !== undefined);
    },

    id: function(id) {
      this.assert(this.obj.prop("id") === id);
    },
    
    html: function(html) {
      this.assert(this.obj.html() === normalizeHtmlTagCase(html));
    },

    text: function(text) {
      if (text && jQuery.isFunction(text.test)) {
        this.assert(text.test(this.obj.text()));
      } else {
        this.assert(this.obj.text() == text);
      }
    },

    value: function(value) {
      this.assert(this.obj.val() == value);
    },
    
    
    data: function(key, expectedValue) {
      if (expectedValue)
        this.assert(this.obj.data(key) == expectedValue);
      else
        this.assert(this.obj.data(key) !== undefined);
    },
    
    visible: function() {
      this.assert(this.obj.is(":visible"));
    },

    hidden: function() {
      this.assert(this.obj.is(":hidden"));
    },

    selected: function() {
      this.assert(this.obj.is(":selected"));
    },

    checked: function() {
      this.assert(this.obj.is(":checked"));
    },

    empty: function() {
      this.assert(this.obj.is(":empty"));
    },

    exist: function() {
      this.assert(this.obj.size() > 0);
    },

    be: function(selector) {
      this.assert(this.obj.is(selector));
    },

    contain: function(selector) {
      this.assert(this.obj.find(selector).size() > 0);
    },
    
    disabled: function() {
      this.assert(this.obj.is(":disabled"));
    },

    handle: function(eventName) {
      var events = this.obj.data("events");
      this.assert(events && events[eventName].length > 0);
    },
   
    handleWith: function(eventName, eventHandler) {
      var stack = this.obj.data("events")[eventName]; 
      var i;
      for (i = 0; i < stack.length; i++) {
        if (stack[i].handler == eventHandler) {
          return;
        }
      }

      this.assert(false);
    }
    
    

  };

  normalizeHtmlTagCase = function(html) {
    return jQuery('<div/>').append(html).html();
  };

  if (typeof(expect) !== "undefined") {
    for (var matcher in matchers) {
      expect.Assertion.prototype[matcher] = matchers[matcher];
    }
  }
})();

