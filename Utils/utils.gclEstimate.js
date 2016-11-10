// add this to the end of your main.js loop

let runTimeGCL = 10;
// Run every x ticks
if ((Game.time % runTimeGCL) === 0) {
    // Can be used to help show how long it takes to do all this math
    let timer = Game.time;
    // Create Estimates in Memory
    if (Memory.stats["Estimates"] === undefined) {
        Memory.stats["Estimates"] = {
            nextGCLLevelTick: 0,
            currentGCLProgress: 0,
            lastGCLProgress: 0,
            estimatedTime: 0
        };
    } else {
        let GCLData = Memory.stats["Estimates"];
        // First time running!
        if (GCLData.currentGCLProgress === 0) {
            GCLData.currentGCLProgress = Game.gcl.progress;
            GCLData.currentTime = Date.now();
        } else {
            GCLData.lastGCLProgress = GCLData.currentGCLProgress;
            GCLData.lastTime = GCLData.currentTime;
            // Average the last runTimeGCL with current
            GCLData.currentGCLProgress = (Game.gcl.progress + GCLData.lastGCLProgress) / 2;
            GCLData.currentTime = Date.now();
            // How much progress have we made in the last runTimeGCL number of ticks
            let progressPer1kTicks = Number(Game.time) + (Game.gcl.progressTotal - Game.gcl.progress) / ((GCLData.currentGCLProgress - GCLData.lastGCLProgress));
            // We want an int and not a float
            GCLData.nextGCLLevelTick = progressPer1kTicks.toFixed(0);
            // The "average" time a tick takes
            let seconds = 3;
            var milliseconds = 1000 * seconds;
            // Central Standard Time
            let CST = 1000 * 60 * 60 * 6;
            // Create a new Date
            var t = new Date();
            // (GCL Progress needed to level - How far we are to next level) / (Current gcl progress - Last gcl progress) * Amount of ticks sense last run * Tick time in milliseconds
            t.setTime(((Game.gcl.progressTotal - Game.gcl.progress) / (GCLData.currentGCLProgress - GCLData.lastGCLProgress) * runTimeGCL) * milliseconds);
            // The extimated time that we will gain our next GCL!
            GCLData.estimatedTime = (new Date(Date.now() + t.getTime() - CST)).toLocaleString();
        }
        Memory.stats["Estimates"] = GCLData;
        console.log(`${Game.time} Estimated GCL leveling, Tick: ${GCLData.nextGCLLevelTick}, Date: ${GCLData.estimatedTime} Execution time: ${Game.time - timer}`);
        if ((Game.time % 50000) === 0) {
            Game.notify(`(${Game.time}): Estimated GCL leveling, Tick: ${GCLData.nextGCLLevelTick}, Date: ${GCLData.estimatedTime}\n Execution time: ${Game.time - timer}`);
        }
    }
}
