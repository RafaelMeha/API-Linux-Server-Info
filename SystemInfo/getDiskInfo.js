const utils = require("../utils/runCommand");
const commands = require("../resources/linuxCommads");

function formatSizeUnits(kilobytes) {
  const GB = (kilobytes * 1024) / 1073741824;
  return parseFloat(GB.toFixed(3));  
}

/**
 * Collects the disk statistics from the system by executing shell commands. It parses the output from these commands to create a data structure with details about each mounted filesystem. It includes disk name, filesystem name, size, 
 * used space, available space, used ratio, and mount point. 
 */
async function getDiskStats() {
  try {
    const dfOutput = (await utils.runCommand("df")).output[0];
    const lsblkOutput = (
      await utils.runCommand("lsblk -b -o NAME,SIZE,MOUNTPOINT")
    ).output[0];

    const dfLines = dfOutput.split("\n");
    const lsblkLines = lsblkOutput.split("\n");

    const lsblkMountPoints = lsblkLines
      .slice(1)
      .map((line) => {
        const parts = line.trim().split(/\s+/g);
        return {
          disk: parts[0].replace(/[0-9]+/g, ""),
          mountPoint: parts[parts.length - 1],
        };
      })
      .filter(({ mountPoint }) => mountPoint !== "");

    dfLines.shift();

    const mountPoints = [];
    const diskMap = new Map();

    for (const line of dfLines) {
      const [filesystem, size, used, available, usedRatio, mountPoint] =
        line.split(/\s+/g);

      if (
        filesystem.startsWith("/dev") &&
        lsblkMountPoints.find(({ mountPoint: mp }) => mp === mountPoint)
      ) {
        let diskName = diskMap.get(filesystem);

        if (!diskName) {
          const parts = filesystem.split("/");

          if (parts[2].startsWith("mapper")) {
            let found = false;

            for (let i = lsblkLines.length - 1; i >= 0; i--) {
              if (found && lsblkLines[i].startsWith('└─')) {
                // let diskNameBe = lsblkLines[i].match(/(?<=└─)([a-z]+)(\d+)(?=\s+)/i);
                // if (diskNameBe !== null) {
                //   diskName = diskNameBe[1];
                //   break;
                // }
                diskName = (/(?<=└─)([a-z]+)(\d+)(?=\s+)/i.exec(lsblkLines[i]) || [ null, 'unknown'])[1]
                if(diskName) break;
              }
    
              if (lsblkLines[i].trim().startsWith('├─ubuntu')) {
                found = true;
              }
            }            
          } else {
            const regexResult = parts[2].match(/([a-z]+)/);
            if (regexResult) {
              diskName = regexResult[1];
            }
          }

          diskMap.set(filesystem, diskName);
        }

        const mountPointInfo = {
          unit: 'GB',
          diskName: diskName,  
          filesystem,
          size: formatSizeUnits(parseFloat(size, 10)) || 0,  
          used: formatSizeUnits(parseFloat(used, 10)) || 0, 
          available: formatSizeUnits(parseFloat(available, 10)) || 0,
          usedRatio,
          mountPoint,
        };

        mountPoints.push(mountPointInfo);
      }
    } 
    return mountPoints;
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports.getDiskStats = getDiskStats;