const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('convertHandler', function(){
    test('should correctly read a whole number input', function() {
      assert.isNumber(convertHandler.getNum('12km'));
    });

    test('should correctly read a decimal number input', function() {
      assert.isNumber(convertHandler.getNum('1.2km'));
    });

    test('should correctly read a fractional input', function() {
      assert.isNumber(convertHandler.getNum('1/2km'));
    });

    test('should correctly read a fractional input with a decimal', function() {
      assert.isNumber(convertHandler.getNum('1.2/3km'));
    });

    test('should correctly return an error on a double-fraction', function() {
      assert.equal(convertHandler.getNum('1/2/3km'), 'invalid number');
    });

    test('should correctly default to a numerical input of 1 when no numerical input is provided', function() {
      assert.isNumber(convertHandler.getNum('km'));
    });

    test('should correctly read each valid input unit', function() {
      assert.equal(convertHandler.getUnit('12km'), 'km');
    });

    test('should correctly return an error for an invalid input unit', function() {
      assert.equal(convertHandler.getUnit('12'), 'invalid unit');
    });

    test('should return the correct return unit for each valid input unit', function() {
      assert.equal(convertHandler.getReturnUnit('gal'), 'L');
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.equal(convertHandler.getReturnUnit('mi'), 'km');
      assert.equal(convertHandler.getReturnUnit('L'), 'gal');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    });

    test('should correctly return the spelled-out string unit for each valid input unit', function() {
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
      assert.equal(convertHandler.spellOutUnit('L'), 'liters');
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    });

    test('should correctly convert gal to L', function() {
      assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    });

    test('should correctly convert L to gal', function() {
      assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    });

    test('should correctly convert mi to km', function() {
      assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    });

    test('should correctly convert km to mi', function() {
      assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    });

    test('should correctly convert lbs to kg', function() {
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    });

    test('should correctly convert kg to lbs', function() {
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    });
  });
});