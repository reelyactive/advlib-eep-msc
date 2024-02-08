/**
 * Copyright reelyActive 2024
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const MIN_DATA_LENGTH_BYTES = 6;
const DEUTA_CONTROLS_URI = 'https://sniffypedia.org/Organization/DEUTA_Controls_GmbH/';


/**
 * Process a Deuta Controls MSC telegram.
 * @param {String} eepType The EEP type as a string.
 * @param {Object} data The raw MSC variable data as a hex-string or Buffer.
 * @return {Object} The processed telegram as JSON.
 */
function process(eepType, data) {
  let buf = utils.convertToBuffer(data);
  if((buf === null) || (buf.length < MIN_DATA_LENGTH_BYTES)) {
    return null;
  }

  // Reference: https://deuta-controls.net/gerate-peripherie/
  switch(eepType) {
    // Reference: ./enosense-people-counter-v2/
    case 'D1-07-10':
      return processPeopleCounter(buf);
    case 'D1-07-11':
      return processNoiseSensor(buf);
    case 'D1-09-01':
      return processSolarCO2Sensor(buf);
  }

  return null;
}


/**
 * Process people counter data.
 * @param {Object} data The raw MSC variable data as a Buffer.
 * @return {Object} The processed telegram as JSON.
 */
function processPeopleCounter(data) {
  let batteryVoltage = data.readUInt8(2) / 50;
  let passageCounts = [ data.readUInt8(5) ];

  return { batteryVoltage: batteryVoltage,
           passageCounts: passageCounts,
           uri: DEUTA_CONTROLS_URI };
}


/**
 * Process noise sensor data.
 * @param {Object} data The raw MSC variable data as a Buffer.
 * @return {Object} The processed telegram as JSON.
 */
function processNoiseSensor(data) {
  let soundPressure = data.readUInt8(2);
  let capacitorVoltage = data.readUInt8(3) / 50;
  let solarVoltage = data.readUInt8(4) / 50;
  let batteryVoltage = data.readUInt8(5) / 50;

  return { batteryVoltage: batteryVoltage,
           capacitorVoltage: capacitorVoltage,
           solarVoltage: solarVoltage,
           soundPressure: soundPressure,
           uri: DEUTA_CONTROLS_URI };
}


/**
 * Process solar CO2 sensor data.
 * @param {Object} data The raw MSC variable data as a Buffer.
 * @return {Object} The processed telegram as JSON.
 */
function processSolarCO2Sensor(data) {
  let carbonDioxideConcentration = data.readUInt16BE(2);
  let capacitorVoltage = data.readUInt8(3) / 50;
  let solarVoltage = data.readUInt8(4) / 50;
  let relativeHumidity = data.readUInt8(4) / 2;
  let temperature = data.readUInt8(5) / 5;
  let batteryVoltage = data.readUInt8(8) / 50;

  return { batteryVoltage: batteryVoltage,
           capacitorVoltage: capacitorVoltage,
           carbonDioxideConcentration: carbonDioxideConcentration,
           relativeHumidity: relativeHumidity,
           solarVoltage: solarVoltage,
           temperature: temperature,
           uri: DEUTA_CONTROLS_URI };
}


module.exports.process = process;