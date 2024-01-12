/**
 * Copyright reelyActive 2024
 * We believe in an open Internet of Things
 */


const advlib = require('../../lib/advlibeepmsc.js');
const assert = require ('assert');


// Input data for the scenario
const INPUT_DATA_INVALID_EEP_TYPE = 'fail';
const INPUT_DATA_INVALID_HEX_STRING = 'xyz';
const INPUT_DATA_TOO_SHORT_BUFFER = Buffer.from('', 'hex');
const INPUT_DATA_PEOPLE_COUNTER_EEP_TYPE = 'D1-07-10';
const INPUT_DATA_PEOPLE_COUNTER = 'd1a500007b0414006980';

// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;
const EXPECTED_DATA_PEOPLE_COUNTER = {
    batteryVoltage: 3.3,
    passageCounts: [ 123 ]
};


// Describe the scenario
describe('advlib-eep-msc', function() {

  // Test the process function with no input data
  it('should handle no input data', function() {
    assert.deepEqual(advlib.processMSCTelegram(), EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with an invalid EEP type
  it('should handle an invalid EEP type as input', function() {
    assert.deepEqual(advlib.processMSCTelegram(INPUT_DATA_INVALID_EEP_TYPE),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with valid People Counter data
  it('should handle valid people counter data as input', function() {
    assert.deepEqual(advlib.processMSCTelegram(
                                             INPUT_DATA_PEOPLE_COUNTER_EEP_TYPE,
                                             INPUT_DATA_PEOPLE_COUNTER),
                                             EXPECTED_DATA_PEOPLE_COUNTER);
  });

});
