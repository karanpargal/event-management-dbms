const express = require('express');
const venueRouter = express.Router();
const venueService = require('./venue.service');

venueRouter.post('/', async (req, res) => {
    const { name, address, capacity, description } = req.body;
    try {
        const venue = await venueService.createVenue(name, address, capacity, description);
        res.status(201).json(venue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

venueRouter.get('/', async (req, res) => {
    try {
        const venues = await venueService.getAllVenues();
        res.status(200).json(venues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

venueRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const venue = await venueService.getVenueById(id);
        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }
        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

venueRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const venueData = req.body;
    try {
        const venue = await venueService.updateVenueById(id, venueData);
        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }
        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

venueRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const venue = await venueService.deleteVenueById(id);
        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }
        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = venueRouter;
