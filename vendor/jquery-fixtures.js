
var readFixtures = function() {
  return jQueryFixtures.getFixtures().proxyCallTo_('read', arguments);
};

var preloadFixtures = function() {
  jQueryFixtures.getFixtures().proxyCallTo_('preload', arguments);
};

var loadFixtures = function() {
  jQueryFixtures.getFixtures().proxyCallTo_('load', arguments);
};

var setFixtures = function(html) {
  jQueryFixtures.getFixtures().set(html);
};

var sandbox = function(attributes) {
  return jQueryFixtures.getFixtures().sandbox(attributes);
};
jQueryFixtures = function() {
  this.containerId = 'jquery-fixtures';
  this.fixturesCache_ = {};
  this.fixturesPath = 'spec/javascripts/fixtures';
};

jQueryFixtures.getFixtures = function() {
  return jQueryFixtures.currentFixtures_ = jQueryFixtures.currentFixtures_ || new jQueryFixtures();
};

jQueryFixtures.prototype.set = function(html) {
  this.cleanUp();
  this.createContainer_(html);
};

jQueryFixtures.prototype.preload = function() {
  this.read.apply(this, arguments);
};

jQueryFixtures.prototype.load = function() {
  this.cleanUp();
  this.createContainer_(this.read.apply(this, arguments));
};

jQueryFixtures.prototype.read = function() {
  var htmlChunks = [];

  var fixtureUrls = arguments;
  for(var urlCount = fixtureUrls.length, urlIndex = 0; urlIndex < urlCount; urlIndex++) {
    htmlChunks.push(this.getFixtureHtml_(fixtureUrls[urlIndex]));
  }

  return htmlChunks.join('');
};

jQueryFixtures.prototype.clearCache = function() {
  this.fixturesCache_ = {};
};

jQueryFixtures.prototype.cleanUp = function() {
  jQuery('#' + this.containerId).remove();
};

jQueryFixtures.prototype.sandbox = function(attributes) {
  var attributesToSet = attributes || {};
  return jQuery('<div id="sandbox" />').attr(attributesToSet);
};

jQueryFixtures.prototype.createContainer_ = function(html) {
  var container;
  if(html instanceof jQuery) {
    container = jQuery('<div id="' + this.containerId + '" />');
    container.html(html);
  } else {
    container = '<div id="' + this.containerId + '">' + html + '</div>';
  }
  jQuery('body').append(container);
};

jQueryFixtures.prototype.getFixtureHtml_ = function(url) {  
  if (typeof this.fixturesCache_[url] == 'undefined') {
    this.loadFixtureIntoCache_(url);
  }
  return this.fixturesCache_[url];
};

jQueryFixtures.prototype.loadFixtureIntoCache_ = function(relativeUrl) {
  var self = this;
  var url = this.fixturesPath.match('/$') ? this.fixturesPath + relativeUrl : this.fixturesPath + '/' + relativeUrl;
  jQuery.ajax({
    async: false, // must be synchronous to guarantee that no tests are run before fixture is loaded
    cache: false,
    dataType: 'html',
    url: url,
    success: function(data) {
      self.fixturesCache_[relativeUrl] = data;
    },
    error: function(jqXHR, status, errorThrown) {
        throw Error('Fixture could not be loaded: ' + url + ' (status: ' + status + ', message: ' + errorThrown.message + ')');
    }
  });
};

jQueryFixtures.prototype.proxyCallTo_ = function(methodName, passedArguments) {
  return this[methodName].apply(this, passedArguments);
};
