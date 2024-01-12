/**
 * Copyright reelyActive 2024
 * We believe in an open Internet of Things
 */


const deutaControls = require('./deutacontrols');
const utils = require('./utils');


const RORG_MSC = 'D1';
const MIN_DATA_LENGTH_BYTES = 4;


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

  let func = eepType.substring(3, 5);
  let type = eepType.substring(6, 9);
  let dataBuf = buf.subarray(1, buf.length - 5);

  switch(func) {
    case '07':
      return deutaControls.process(type, dataBuf);
  }

  return null;
}


module.exports.processMSCTelegram = processMSCTelegram;