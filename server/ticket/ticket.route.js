const express = require('express');
const ticketRouter = express.Router();
const ticketService = require('./ticket.service');

ticketRouter.post('/', async (req, res) => {
    const { eventId, userId, price, quantity } = req.body;
    try {
        const ticket = await ticketService.createTicket(eventId, userId, price, quantity);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

ticketRouter.get('/', async (req, res) => {
    try {
        const tickets = await ticketService.getAllTickets();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

ticketRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await ticketService.getTicketById(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

ticketRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const ticketData = req.body;
    try {
        const ticket = await ticketService.updateTicketById(id, ticketData);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

ticketRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await ticketService.deleteTicketById(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = ticketRouter;
