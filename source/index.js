// Section 1.
//   (a)
//     (i)
//       (A)
//         (I)

var lowerAlpha = require('lower-alpha');

var upperAlpha = function(i) {
  return lowerAlpha(i).toUpperCase();
};

var upperRoman = require('romanize');

var lowerRoman = function(i) {
  return upperRoman(i).toLowerCase();
};

var arabic = function(i) {
  return i.toString();
};

var compound = function(primary, secondary) {
  return function(element, series) {
    return (
      (series ? secondary(series) + '-' : '') +
      primary(element)
    );
  };
};

var inTheHole = function(primary, secondary) {
  var compounded = compound(primary, secondary);
  return function(element, series) {
    return '(' + compounded(element, series) + ')';
  };
};

var LEVEL_FORMATTERS = [null, compound(arabic, upperAlpha)];

var REPEATING_FORMATTERS = [
  inTheHole(lowerAlpha, arabic),
  inTheHole(lowerRoman, arabic),
  inTheHole(upperAlpha, arabic),
  inTheHole(upperRoman, arabic)
];

var formatterForLevel = function(level) {
  if (level < LEVEL_FORMATTERS.length) {
    return LEVEL_FORMATTERS[level];
  } else {
    var offset = level - LEVEL_FORMATTERS.length;
    return REPEATING_FORMATTERS[offset % REPEATING_FORMATTERS.length];
  }
};

var renderComponent = function(component, level) {
  return formatterForLevel(level)(
    component.element.number,
    component.series.of > 1 ? component.series.number : null
  );
};

exports.provision = function(numbering) {
  var length = numbering.length;
  return (
    renderComponent(numbering[length - 1], length) +
    (numbering.length === 1 ? '.' : '')
  );
};

exports.reference = function(numbering) {
  return (
    'Section ' +
    numbering.reduce(function(number, component, i) {
      return number + renderComponent(component, i + 1);
    }, '')
  );
};

exports.version = '0.1.0';
