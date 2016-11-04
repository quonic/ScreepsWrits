/*
 Some math for Screeps to help the AI "think" a bit better
 Inspired by aeyi on Slack
 */

// https://68.media.tumblr.com/16cbbc594954cf014a42f55357ce6048/tumblr_og39vjBM3u1uqpzebo1_1280.png

// Spreadsheet showing how these equations work out when graphed
// https://docs.google.com/spreadsheets/d/1fvmxjqwWEHCkI5LTFA0K_aPLFAfF016E5IHZb9Xi23M/edit#gid=1779388467

/*
 Example inputs
 max        	100	Maximum value of input
 weight     	2	Quadratic weight
 threshold      0.5	Step threshold
 decay      	0.2	Decay weight
 */


global.Maths = class {
    /**
     * Quadratic / Rotated Quadratic
     * @param {number} input
     * @param {number} max - Maximum value of x
     * @param {number} weight - Quadratic weight
     * @param {boolean} rotated - make this a rotated quadratic
     * @returns {number}
     */
    static quadratic(input, max, weight, rotated = false) {
        if (rotated) {
            return 1 - Math.pow(input / max, weight);
        }
        return Math.pow(input / max, weight);
    }
    
    /**
     * Linear / SquareRoot
     * @param {number} input
     * @param {number} max
     * @param {boolean} square
     * @returns {number}
     */
    static linear(input, max, square = false) {
        if (square) {
            return Math.sqrt(input / max);
        }
        return input / max;
    }
    
    /**
     * Step
     * @param {number} input
     * @param {number} max
     * @param {number} threshold
     * @returns {number}
     */
    static step(input, max, threshold) {
        return input / max > threshold ? 1 : 0;
    }
    
    /**
     * Decay
     * @param {number} input
     * @param {number} max
     * @param {number} decay
     * @returns {number}
     */
    static decay(input, max, decay) {
        return Math.pow(decay, input / max);
    }
    
    /**
     * Sigmoid Curve / Inverse Sigmoid
     * @param {number} input
     * @param {boolean} inverse
     * @returns {number}
     */
    static sigmoidCurve(input, inverse = false) {
        if (inverse) {
            return 1 / (1 + Math.pow(Math.E, -input));
        }
        return 1 / (1 + Math.pow(Math.E, input));
    }
};
