/* jshint node: true, mocha: true */
var expect = require('chai').expect;
var outline = require('..');

describe('Outline style', function() {
  describe('provision numbering', function() {
    it('uses Arabic numerals for top-level', function() {
      expect(
        outline.provision([
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}}
        ])
      ).to.equal('1.');
    });

    it('uses lower-alpha numerals for second-level', function() {
      expect(
        outline.provision([
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}}
        ])
      ).to.equal('(a)');
    });

    it('uses alphabetic prefixes for multiple series', function() {
      expect(
        outline.provision([
          {series: {number: 1, of: 2}, element: {number: 1, of: 1}}
        ])
      ).to.equal('A-1.');
    });
  });

  describe('reference numbering', function() {
    it('uses Arabic numerals for first-level', function() {
      expect(
        outline.reference([
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}}
        ])
      ).to.equal('Section 1');
    });

    it('uses lower-alpha numerals for second-level', function() {
      expect(
        outline.reference([
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}}
        ])
      ).to.equal('Section 1(a)');
    });

    it('uses lower-roman numerals for third-level', function() {
      expect(
        outline.reference([
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}}
        ])
      ).to.equal('Section 1(a)(i)');
    });

    it('uses upper-alpha numerals for fourth-level', function() {
      expect(
        outline.reference([
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}}
        ])
      ).to.equal('Section 1(a)(i)(A)');
    });

    it('uses upper-Roman numerals for fifth-level', function() {
      expect(
        outline.reference([
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}}
        ])
      ).to.equal('Section 1(a)(i)(A)(I)');
    });

    it('repeats after the fifth level', function() {
      expect(
        outline.reference([
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}},
          {series: {number: 1, of: 1}, element: {number: 1, of: 1}}
        ])
      ).to.equal('Section 1(a)(i)(A)(I)(a)');
    });
  });
});
