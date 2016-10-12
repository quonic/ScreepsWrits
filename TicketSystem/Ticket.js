require('Ticket.const');

class Ticket {
    /**
     * A Ticket object
     * @param owner
     * @param priority
     * @param tasks
     * @param requirements
     * @param worker
     */
    constructor(owner, priority, tasks, requirements, worker = "") {
        this.constructor.tick = Game.time;
        this.constructor.owner = owner;
        this.constructor.tasks = tasks;
        this.constructor.requirements = requirements;
        this.constructor.worker = worker;
        this.constructor.priority = priority;
        this.constructor.status = STATUS_OPEN
    }
    
    /**
     *
     * @param {string} id
     */
    set worker(id) {
        this.constructor.worker = id;
    }
    
    /**
     *
     * @returns {string}
     */
    get worker() {
        if (!this.constructor.worker) {
            throw new Error("Worker ID not set");
        }
        return this.constructor.worker;
    }
    
    /**
     *
     * @returns {string}
     */
    get owner() {
        return this.constructor.owner;
    }
    
    /**
     *
     * @returns {number}
     */
    get priority() {
        return this.constructor.priority;
    }
    
    /**
     *
     * @param {number} number
     */
    set priority(number) {
        this.constructor.priority = number;
    }
    
    /**
     *
     * @returns {Array}
     */
    get tasks() {
        return this.constructor.tasks;
    }
    
    /**
     *
     * @returns {Array}
     */
    get requirements() {
        return this.constructor.requirements;
    }
    
    /**
     * Returns this ticket as an Object
     * @returns {Object}
     */
    toObject() {
        return {
            tick: this.constructor.tick,
            owner: this.constructor.owner,
            task: this.constructor.tasks,
            requirements: this.constructor.requirements,
            worker: this.constructor.worker,
            priority: this.constructor.priority,
            status: this.constructor.status
        };
    }
}

module.export = Ticket;
