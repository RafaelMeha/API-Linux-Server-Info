const memory = require('./getMemoryInfo.js');
const cpu = require('./getCpuInfo.js');
const disk = require('./getDiskInfo.js')

/**
 * Collects system statistics about memory usage, CPU usage, disk usage, and Docker process statistics. 
 * The results are combined into an object and returned.
 */
async function getStats() {
    const output = {};
    output.memory = await memory.getMemoryStats();
    output.cpu = await cpu.getCPUUsage();
    output.disks = await disk.getDiskStats();
    return output;
}
module.exports.getStats = getStats;