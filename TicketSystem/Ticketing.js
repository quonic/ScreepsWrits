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
        return Memory2Ticket(ticketNumber);
    };
    
    /**
     * Return tickets from owner
     * @param {string} owner
     * @returns {*}
     * @constructor
     */
    FindTicketsForOwner(owner) {
        return _.filter(this.memory, function (ticket) {
            return ticket.owner === owner;
        });
    }
    
    /**
     * Create Ticket
     * @param {Ticket} ticket
     * @constructor
     */
    CreateTicket(ticket) {
        let ticketNumber = guid();
        if (this.memory[ticketNumber]) {
            throw new Error("CreateTicket() Ticket already exists! This isn't suppose to happen.")
        } else {
            this.memory.set(ticketNumber, ticket.toObject());
        }
    };
    
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
        if (this.memory.tickets[ticketNumber]) {
            this.memory.tickets[ticketNumber].status = status;
        } else {
            throw new Error("ChangeTicketStatus() ticket doesn't exist.");
        }
    }
}

function Memory2Ticket(TicketNumber) {
    if (!Memory.tickets.hasOwnProperty(TicketNumber)) {
        throw new Error(`Memory2Ticket() Ticket ${TicketNumber} does not exist.`);
    }
    let TicketMemory = Memory.tickets[TicketNumber];
    let ticket = {};
    if (TicketMemory.worker) {
        ticket.set("worker", TicketMemory.worker);
    }
    if (TicketMemory.tasks) {
        ticket.set("tasks", TicketMemory.tasks);
    }
    if (TicketMemory.requirements) {
        ticket.set("requirements", TicketMemory.requirements);
    }
    if (TicketMemory.owner) {
        ticket.set("owner", TicketMemory.owner);
    }
    if (TicketMemory.tick) {
        ticket.set("tick", TicketMemory.tick);
    }
    if (TicketMemory.priority) {
        ticket.set("priority", TicketMemory.priority);
    }
    if (TicketMemory.status) {
        ticket.set("status", TicketMemory.status);
    }
    if (TicketMemory.targets) {
        ticket.set("targets", TicketMemory.targets);
    }
    
    return {[TicketNumber]: ticket}
    
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
