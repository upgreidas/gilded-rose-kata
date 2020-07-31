const BaseStrategy = require('./BaseStrategy');
const IncreasingQualityStrategy = require('./IncreasingQualityStrategy');

module.exports = {
  BaseStrategy: new BaseStrategy(),
  IncreasingQualityStrategy: new IncreasingQualityStrategy(),
};
