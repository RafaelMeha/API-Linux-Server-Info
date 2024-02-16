const utils = require('../utils/runCommand');
const commands = require('../resources/linuxCommads');

/**
 * Function to get the percentage of the CPU being used
 * @returns cpu %
 */
async function getCPUUsage() {
    const rawResult = await utils.runCommand(commands.CPUUsagePercentage).catch((err) => {
        console.log(err);
    });
    const extractedValue = rawResult.output[0];
    const cleannedExtractedValue = parseInt(extractedValue) / 100;
    let cleannedValue = cleannedExtractedValue.toString().replace(/\n\n/g, '');
    cleannedValue = parseFloat(cleannedValue)
    return cleannedValue;
}

module.exports.getCPUUsage = getCPUUsage;
