/**
 * Copyright reelyActive 2024
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const MIN_DATA_LENGTH_BYTES = 4;


/**
 * Process a Deuta Controls MSC telegram.
 * @param {String} type The specific type of telegram.
 * @param {Object} data The raw telegram as a hexadecimal-string or Buffer.
 * @return {Object} The processed telegram as JSON.
 */
function process(type, data) {
  let buf = utils.convertToBuffer(data);
  if((buf === null) || (buf.length < MIN_DATA_LENGTH_BYTES)) {
    return null;
  }

  // Reference: https://deuta-controls.net/gerate-peripherie/
  switch(type) {
    // Reference: ./enosense-people-counter-v2/
    case '10':
      return processPeopleCounter(buf);
  }

  return null;
}


/**
 * Process people counter data.
 * @param {Object} data The raw telegram as a Buffer.
 * @return {Object} The processed telegram as JSON.
 */
function processPeopleCounter(data) {
  let batteryVoltage = data.readUInt8(0) / 50;
  let passageCounts = [ data.readUInt8(3) ];

  return { batteryVoltage: batteryVoltage,
           passageCounts: passageCounts };
}


module.exports.process = process;