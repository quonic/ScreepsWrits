let Ticketing = require('Ticketing');
let Ticket = require('Ticket');
require('Ticket.const');

module.exports.loop = function () {
    let TicketSystem = new Ticketing();
    
    let workerBodyReq = [MOVE, CARRY, WORK];
    let workerTaskList = [TASK_FILL_SPAWN, TASK_FILL_STORAGE, TASK_IDLE];
    
    let ticket = new Ticket("Spawn1", 1, workerTaskList, workerBodyReq);
    
    TicketSystem.CreateTicket(ticket);
    
    let ticketNumber = TicketSystem.FindTicketsForOwner("Spawn1");
    
    ticket = TicketSystem.GetTicket(ticketNumber);
    console.log(ticket.owner);
    TicketSystem.IncreasePriority(ticketNumber);
    TicketSystem.DecreasePriority(ticketNumber);
    TicketSystem.ChangeTicketStatus(ticketNumber, STATUS_WORKING);
    TicketSystem.CloseTicket(ticketNumber);
}
