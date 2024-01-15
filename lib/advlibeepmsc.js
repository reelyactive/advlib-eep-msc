/**
 * Copyright reelyActive 2024
 * We believe in an open Internet of Things
 */


const deutaControls = require('./deutacontrols');
const utils = require('./utils');


const RORG_MSC = 'D1';
const MIN_DATA_LENGTH_BYTES = 8; // TODO


/**
 * Process EEP manufacturer specific communication data (MSC) telegrams.
 * @param {String} eepType The EEP type as a string.
 * @param {Object} data The raw telegram data as a hexadecimal-string or Buffer.
 * @return {Object} The processed telegram as JSON.
 */
function processMSCTelegram(eepType, data) {
  let buf = utils.convertToBuffer(data);
  eepType = utils.convertToEEPType(eepType);

  if((eepType === null) || (eepType.substring(0, 2) !== RORG_MSC) ||
     (buf === null) || (buf.length < MIN_DATA_LENGTH_BYTES)) {
    return null;
  }

  let manufacturerId = buf.readUInt16BE(1) >> 4;
  let variableDataBuf = buf.subarray(3, buf.length - 5);

  // Reference: https://www.enocean.com/wp-content/uploads/redaktion/support/enocean-link/eo_manufacturer_8h.html
  switch(manufacturerId) {
    case 0x047:
      return deutaControls.process(eepType, variableDataBuf);
  }

  return null;
}


module.exports.processMSCTelegram = processMSCTelegram;