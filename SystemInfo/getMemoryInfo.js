const utils = require('../utils');
const commands = require('../resources/linuxCommads');

/**
 * Retrieves the total memory space on the machine by executing a shell command. It cleans and parses the output to return
 * the value in a numeric format.
 */
async function getTotalSpace() {
    const rawResult = await utils.runCommand(commands.MemoryTotalSpace);
    const extractedValue = await rawResult.output[0];
    let cleannedValue = extractedValue.replace(/\n\n/g, '');
    cleannedValue = parseFloat(cleannedValue)
    return cleannedValue;
}

/**
 * Retrieves the free memory space on the machine by executing a shell command. It cleans and parses the output to return
 * the value in a numeric format.
 */
async function getFreeSpace() {
    const rawResult = await utils.runCommand(commands.MemoryFreeSpace);
    const extractedValue = rawResult.output[0];
    let cleannedValue = extractedValue.replace(/\n\n/g, '');
    cleannedValue = parseFloat(cleannedValue)
    return cleannedValue;
}

/**
 * Retrieves the used memory space on the machine by executing a shell command. It cleans and parses the output to return
 * the value in a numeric format.
 */
async function getUsedSpace() {
    const rawResult = await utils.runCommand(commands.MemoryUsedSpace);
    const extractedValue = rawResult.output[0];
    let cleannedValue = extractedValue.replace(/\n\n/g, '');
    cleannedValue = parseFloat(cleannedValue)
    return cleannedValue;
}

async function getMemoryStats() {
    const output = {};
    output.unit = 'MB';
    output.usage = await getUsedSpace();
    output.total = await getTotalSpace();
    output.free = await getFreeSpace();
    return output;
}

module.exports.getMemoryStats = getMemoryStats;
