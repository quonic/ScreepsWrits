let Ticket = require('Ticket');

class Ticketing {
    constructor() {
        this.memory = Memory["tickets"];
    }
    /**
     * Get tickets for worker by id
     * @param ticketNumber
     * @returns {*}
     * @constructor
     */
    GetTicket(ticketNumber) {
        if (ticketNumber) {
            return this.memory[ticketNumber];
        } else {
            throw new Error("GetTicket() Failed to get ticket.");
        }
    };
    /**
     * Create ticket
     * @param {string} owner
     * @param {number} priority
     * @param {array} requirements
     * @param {array} tasks
     * @constructor
     */
    CreateTicket(owner, priority, requirements, tasks) {
        let ticket = new Ticket(owner, priority, tasks, requirements);
        let ticketNumber = guid();
        if (this.memory[ticketNumber]) {
            throw new Error("CreateTicket() Ticket already exists! This isn't suppose to happen.")
        } else {
            this.memory.set(ticketNumber, ticket);
        }
    }
    /**
     * Increase priority - 0 being highest
     * @param {string} ticketNumber
     * @constructor
     */
    IncreasePriority(ticketNumber) {
        if (this.memory[ticketNumber] && this.memory[ticketNumber].priority > 0) {
            this.memory[ticketNumber].priority--
        } else {
            throw new Error("IncreasePriority() Failed to escalate ticket.");
        }
    }
    /**
     * Decrease priority - 0 being highest
     * @param {string} ticketNumber
     * @constructor
     */
    DecreasePriority(ticketNumber) {
        if (this.memory.tickets[ticketNumber]) {
            this.memory[ticketNumber].priority++;
        } else {
            throw new Error("DecreasePriority() ticket doesn't exist.");
        }
    }
    /**
     * Close ticket
     * @param {string} ticketNumber
     * @constructor
     */
    CloseTicket(ticketNumber) {
        if (this.memory.tickets[ticketNumber]) {
            this.memory.tickets[ticketNumber] = undefined;
        } else {
            throw new Error("CloseTicket() ticket doesn't exist.");
        }
    }
    /**
     * Change Ticket Status
     * @param {string} ticketNumber
     * @param {string} status
     * @constructor
     */
    ChangeTicketStatus(ticketNumber, status) {
        if (this.memory.tickets[ticketNumber]){
            this.memory.tickets[ticketNumber].status = status;
        } else {
            throw new Error("ChangeTicketStatus() ticket doesn't exist.");
        }
    }
}
/**
 * Generate guid
 * @param small
 * @returns {*}
 */
function guid(small = false) {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    if (small) {
        return s4() + s4();
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
module.export = Ticketing;
