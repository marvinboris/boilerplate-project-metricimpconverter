'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  const roundTo5Decimals = (num) => 
    num % 1 !== 0 ? parseFloat(num.toFixed(5)) : num;
  
  app.route('/api/convert').get((req, res) => {
    const { input } = req.query;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initUnit === 'invalid unit' && initNum === 'invalid number') 
      return res.send('invalid number and unit');
    else if (initUnit === 'invalid unit') 
      return res.send(initUnit);
    else if (initNum === 'invalid number') 
      return res.send(initNum);
    
    const returnNum = roundTo5Decimals(
      convertHandler.convert(
        initNum, 
        initUnit
      )
    );
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(
      initNum, 
      initUnit, 
      returnNum, 
      returnUnit
    );
    
    const result = { initNum, initUnit, returnNum, returnUnit, string };
    
    res.json(result);
  });
};
