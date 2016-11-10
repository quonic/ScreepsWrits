// add this to the end of your main.js loop

let runTimeGCL = 10;
if ((Game.time % runTimeGCL) === 0) {
    let timer = Game.time;
    if (Memory.stats["Estimates"] === undefined) {
        Memory.stats["Estimates"] = {
            nextGCLLevelTick: 0,
            currentGCLProgress: 0,
            lastGCLProgress: 0,
            estimatedTime: 0
        };
    } else {
        let GCLData = Memory.stats["Estimates"];
        if (GCLData.currentGCLProgress === 0) {
            GCLData.currentGCLProgress = Game.gcl.progress;
            GCLData.currentTime = Date.now();
        } else {
            GCLData.lastGCLProgress = GCLData.currentGCLProgress;
            GCLData.lastTime = GCLData.currentTime;
            GCLData.currentGCLProgress = (Game.gcl.progress + GCLData.lastGCLProgress) / 2;
            GCLData.currentTime = Date.now();
            let progressPer1kTicks = Number(Game.time) + (Game.gcl.progressTotal - Game.gcl.progress) / ((GCLData.currentGCLProgress - GCLData.lastGCLProgress));
            GCLData.nextGCLLevelTick = progressPer1kTicks.toFixed(0);
            let seconds = 3;
            var milliseconds = 1000 * seconds;
            let CST = 1000 * 60 * 60 * 6;
            var t = new Date();
            t.setTime(((Game.gcl.progressTotal - Game.gcl.progress) / (GCLData.currentGCLProgress - GCLData.lastGCLProgress) * runTimeGCL) * milliseconds);
            GCLData.estimatedTime = (new Date(Date.now() + t.getTime() - CST)).toLocaleString();
        }
        Memory.stats["Estimates"] = GCLData;
        console.log(`${Game.time} Estimated GCL leveling, Tick: ${GCLData.nextGCLLevelTick}, Date: ${GCLData.estimatedTime} Execution time: ${Game.time - timer}`);
        if ((Game.time % 50000) === 0) {
            Game.notify(`(${Game.time}): Estimated GCL leveling, Tick: ${GCLData.nextGCLLevelTick}, Date: ${GCLData.estimatedTime}\n Execution time: ${Game.time - timer}`);
        }
    }
}
