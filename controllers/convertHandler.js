function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;

    const regex = /(\d+(\.\d+)?(\/\d+)?)\s*([a-zA-Z]+)/;
    const match = input.match(regex);

    function convertFractionToNumber(fraction) {
      const [numerator, denominator] = fraction.split('/').map(str => parseInt(str, 10));
      return numerator / denominator;
    }

    if (input.split('/').length > 2) return 'invalid number';
    else if (match) result = match[3] ? convertFractionToNumber(match[1]) : parseFloat(match[1]);
    else result = 1;
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;

    const regex = /(\d+(\.\d+)?(\/\d+)?)\s*([a-zA-Z]+)/;
    const match = input.match(regex);

    if (match) result = match[4];
    else result = input;

    if (!['gal', 'L', 'lbs', 'kg', 'mi', 'km'].includes(result)) return 'invalid unit';
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    result = {
      'gal': 'L',
      'lbs': 'kg',
      'mi': 'km',
      'L': 'gal',
      'kg': 'lbs',
      'km': 'mi'
    }[initUnit];

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    result = {
      'gal': 'gallons',
      'lbs': 'pounds',
      'mi': 'miles',
      'L': 'liters',
      'kg': 'kilograms',
      'km': 'kilometers'
    }[unit];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    result = {
      'gal': galToL,
      'lbs': lbsToKg,
      'mi': miToKm,
      'L': 1 / galToL,
      'kg': 1 / lbsToKg,
      'km': 1 / miToKm
    }[initUnit] * initNum;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
