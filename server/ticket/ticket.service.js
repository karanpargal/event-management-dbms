async function createTicket(eventId, userId, price, quantity) {
  try {
    const newTicket = await Ticket.create({
      event: eventId,
      user: userId,
      price,
      quantity,
    });
    return newTicket;
  } catch (error) {
    throw error;
  }
}

async function getAllTickets() {
  try {
    const tickets = await Ticket.find();
    return tickets;
  } catch (error) {
    throw error;
  }
}

async function getTicketById(id) {
  try {
    const ticket = await Ticket.findById(id);
    return ticket;
  } catch (error) {
    throw error;
  }
}

async function updateTicketById(id, data) {
  try {
    const ticket = await Ticket.findByIdAndUpdate(id, data, { new: true });
    return ticket;
  } catch (error) {
    throw error;
  }
}

async function deleteTicketById(id) {
  try {
    const ticket = await Ticket.findByIdAndDelete(id);
    return ticket;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
};
