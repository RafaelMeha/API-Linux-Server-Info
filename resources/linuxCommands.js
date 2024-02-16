module.exports = {
    /**
     *  Command to get the free space in the Memory (MB)
     *  Example: "12489"
     */
    MemoryFreeSpace: "free --mega | awk 'NR==2{print $7}'",

    /**
     *  Command to get the total space in the Memory (MB)
     *  Example: "16686"
     */
    MemoryTotalSpace: "free --mega | awk 'NR==2{print $2}'",

    /**
     *  Command to get the space being used in the Memory (MB)
     *  Example: "3890"
     */
    MemoryUsedSpace: "free --mega | awk 'NR==2{print $3}'",

    /**
     *  Command to get cpu percentage being used
     *  Example: "2.3%"
     */
    CPUUsagePercentage: `top -bn1 | grep '%Cpu(s)' | awk '{printf "%.2f%%\\n", $2 + $4}'`,

    /**
     *  Command to get the docker images data
     *  Example: "tools/example                25        9ff9f0f9vbt   3 weeks ago   973MB"
     */
    DockerImages: "docker images | awk 'NR > 1'",

    /**
     *  Command to get the docker containers data
     *  Example: "jjioe5t3jjf2   nodeapp:latest   \"docker-entrypoint.s…\"   4 weeks ago   Up 5 hours   0.0.0.0:47802->3000/tcp, :::47802->3000/tcp   nodeapp_dc"
     */
    DockerContainers: "docker container ls | awk 'NR > 1'",

    DisksStats: `lsblk -b -o NAME,SIZE,MOUNTPOINT`,

    DisksAndMountPointsStats: `df -h `
};
