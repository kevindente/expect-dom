describe("to.have.cssclass", function() {
  var className = "some-class";

  it("should pass when class found", function() {
    setFixtures(sandbox({'class': className}));
    expect($('#sandbox')).to.have.cssclass(className);
  });

  it("should pass negated when class not found", function() {
    setFixtures(sandbox());
    expect($('#sandbox')).not.to.have.cssclass(className);
  });    
});

describe("to.have.attr", function() {
  var attributeName = 'attr1';
  var attributeValue = 'attr1 value';
  var wrongAttributeName = 'wrongName';
  var wrongAttributeValue = 'wrong value';

  beforeEach(function() {
    var attributes = {};
    attributes[attributeName] = attributeValue;
    setFixtures(sandbox(attributes));
  });

  describe("when only attribute name is provided", function() {
    it("should pass if element has matching attribute", function() {
      expect($('#sandbox')).to.have.attr(attributeName);
    });

    it("should pass negated if element has no matching attribute", function() {
      expect($('#sandbox')).not.to.have.attr(wrongAttributeName);
    });
  });

  describe("when both attribute name and value are provided", function() {
    it("should pass if element has matching attribute with matching value", function() {
      expect($('#sandbox')).to.have.attr(attributeName, attributeValue);
    });

    it("should pass negated if element has matching attribute but with wrong value", function() {
      expect($('#sandbox')).not.to.have.attr(attributeName, wrongAttributeValue);
    });

    it("should pass negated if element has no matching attribute", function() {
      expect($('#sandbox')).not.to.have.attr(wrongAttributeName, attributeValue);
    });
  });
});
describe("to.have.id", function() {
  beforeEach(function() {
    setFixtures(sandbox());
  });

  it("should pass if id attribute matches expectation", function() {
    expect($('#sandbox')).to.have.id('sandbox');
  });

  it("should pass negated if id attribute does not match expectation", function() {
    expect($('#sandbox')).not.to.have.id('wrongId');
  });

  it("should pass negated if id attribute is not present", function() {
    expect($('<div />')).not.to.have.id('sandbox');
  });
});

describe("to.have.html", function() {
  var html = '<div>some text</div>';
  var htmlWithDifferentTagCase = '<DIV>some text</DIV>';
  var wrongHtml = '<span>some text</span>';
  var element;

  beforeEach(function() {
    element = $('<div/>').append(html);
  });

  it("should pass when html matches", function() {
    expect(element).to.have.html(html);
  });

  it("should pass negated when html does not match", function() {
    expect(element).not.to.have.html(wrongHtml);
  });

  it ("should pass when only html tag cases are different", function() {
    expect(element).to.have.html(htmlWithDifferentTagCase);      
  });
});

describe("to.have.text", function() {
  var text = 'some text';
  var wrongText = 'some other text';
  var element;

  beforeEach(function() {
    element = $('<div/>').append(text);
  });

  it("should pass when text matches", function() {
    expect(element).to.have.text(text);
  });

  it("should pass negated when text does not match", function() {
    expect(element).not.to.have.text(wrongText);
  });

  it('should pass when text matches a regex', function() {
    expect(element).to.have.text(/some/);
  });

  it('should pass negated when text does not match a regex', function() {
    expect(element).not.to.have.text(/other/);
  });
});

describe("to.have.value", function() {
  var value = 'some value';
  var differentValue = 'different value'

  beforeEach(function() {
    setFixtures($('<input id="sandbox" type="text" />').val(value));
  });

  it("should pass if value matches expectation", function() {
    expect($('#sandbox')).to.have.value(value);
  });

  it("should pass negated if value does not match expectation", function() {
    expect($('#sandbox')).not.to.have.value(differentValue);
  });

  it("should pass negated if value attribute is not present", function() {
    expect(sandbox()).not.to.have.value(value);
  });
});

describe("to.have.data", function() {
  var key = 'some key';
  var value = 'some value';
  var wrongKey = 'wrong key';
  var wrongValue = 'wrong value';

  beforeEach(function() {
    setFixtures(sandbox().data(key, value));
  });

  describe("when only key is provided", function() {
    it("should pass if element has matching data key", function() {
      expect($('#sandbox')).to.have.data(key);
    });

    it("should pass negated if element has no matching data key", function() {
      expect($('#sandbox')).not.to.have.data(wrongKey);
    });
  });

  describe("when both key and value are provided", function() {
    it("should pass if element has matching key with matching value", function() {
      expect($('#sandbox')).to.have.data(key, value);
    });

    it("should pass negated if element has matching key but with wrong value", function() {
      expect($('#sandbox')).not.to.have.data(key, wrongValue);
    });

    it("should pass negated if element has no matching key", function() {
      expect($('#sandbox')).not.to.have.data(wrongKey, value);
    });
  });
});

describe("to.be.visible", function() {
  it("should pass on visible element", function() {
    setFixtures(sandbox());
    expect($('#sandbox')).to.be.visible();
  });

  it("should pass negated on hidden element", function() {
    setFixtures(sandbox().hide());
    expect($('#sandbox')).not.to.be.visible();
  });
});

describe("to.be.hidden", function() {
  it("should pass on hidden element", function() {
    setFixtures(sandbox().hide());
    expect($('#sandbox')).to.be.hidden();
  });

  it("should pass negated on visible element", function() {
    setFixtures(sandbox());
    expect($('#sandbox')).not.to.be.hidden();
  });
});

describe("to.be.selected", function() {
  beforeEach(function() {
    setFixtures('\
                <select>\n\
                <option id="not-selected"></option>\n\
                <option id="selected" selected="selected"></option>\n\
                </select>');
  });

  it("should pass on selected element", function() {
    expect($('#selected')).to.be.selected();
  });

  it("should pass negated on not selected element", function() {
    expect($('#not-selected')).not.to.be.selected();
  });
});

describe("to.be.checked", function() {
  beforeEach(function() {
    setFixtures('\
                <input type="checkbox" id="checked" checked="checked" />\n\
                <input type="checkbox" id="not-checked" />');
  });

  it("should pass on checked element", function() {
    expect($('#checked')).to.be.checked();
  });

  it("should pass negated on not checked element", function() {
    expect($('#not-checked')).not.to.be.checked();
  });
});

describe("to.be.empty", function() {
  it("should pass on empty element", function() {
    setFixtures(sandbox());
    expect($('#sandbox')).to.be.empty();
  });

  it("should pass negated on element with a tag inside", function() {
    setFixtures(sandbox().html($('<span />')));
    expect($('#sandbox')).not.to.be.empty();
  });

  it("should pass negated on element with text inside", function() {
    setFixtures(sandbox().text('some text'));
    expect($('#sandbox')).not.to.be.empty();
  });
});

describe("to.exist", function() {
  it("should pass on visible element", function() {
    setFixtures(sandbox());
    expect($('#sandbox')).to.exist();
  });

  it("should pass on hidden element", function() {
    setFixtures(sandbox().hide());
    expect($('#sandbox')).to.exist();
  });

  it("should pass negated if element is not present in DOM", function() {
    expect($('#non-existent-element')).not.to.exist();
  });
});

describe("to.be", function() {
  beforeEach(function() {
    setFixtures(sandbox());
  });

  it("should pass if object matches selector", function() {
    expect($('#sandbox')).to.matchSelector('#sandbox');
  });

  it("should pass negated if object does not match selector", function() {
    expect($('#sandbox')).not.to.matchSelector('#wrong-id');
  });
});

describe("to.containChild", function() {
  beforeEach(function() {
    setFixtures(sandbox().html('<span />'));
  });

  it("should pass if object contains selector", function() {
    expect($('#sandbox')).to.containChild('span');
  });

  it("should pass negated if object does not contain selector", function() {
    expect($('#sandbox')).not.to.containChild('div');
  });
});

describe("to.be.disabled", function() {
  beforeEach(function() {
    setFixtures('\
                <input type="text" disabled="disabled" id="disabled"/>\n\
                <input type="text" id="enabled"/>');
  });

  it("should pass on disabled element", function() {
    expect($('#disabled')).to.be.disabled();
  });

  it("should pass negated on not selected element", function() {
    expect($('#enabled')).not.to.be.disabled();
  });
});

describe('to.handle', function() {
  beforeEach(function() {
    setFixtures(sandbox().html('<a id="clickme">Click Me</a> <a id="otherlink">Other Link</a>'));
  });

  it('should pass if the event is bound', function() {
    var handler = function(){ }; // noop
    $('#clickme').bind("click", handler);
    expect($('#clickme')).to.handle("click");
  });

  it('should pass if the event is not bound', function() {
    expect($('#clickme')).not.to.handle("click");
  });
});

describe('to.handleWith', function() {
  beforeEach(function() {
    setFixtures(sandbox().html('<a id="clickme">Click Me</a> <a id="otherlink">Other Link</a>'));
  });

  it('should pass if the event is bound with the given handler', function() {
    var handler = function(){ }; // noop
    $('#clickme').bind("click", handler);
    expect($('#clickme')).to.handleWith("click", handler);
  });

  it('should pass if the event is not bound with the given handler', function() {
    var handler = function(){ };
    $('#clickme').bind("click", handler);

    var aDifferentHandler = function(){ };
    expect($('#clickme')).not.to.handleWith("click", aDifferentHandler);
  });

  it('should pass if the event is not bound at all', function() {
    expect($('#clickme')).not.to.handle("click");
  });
});
