const express = require('express');
const router = express.Router();
const serviceModel = require('../models/serviceModel');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await serviceModel.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single service by ID
router.get('/:id', getService, (req, res) => {
  res.json(res.service);
});

// Create a new service
router.post('/', async (req, res) => {
  const service = new serviceModel({
    name: req.body.name,
    url: req.body.url,
    timeout: req.body.timeout,
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a service by ID
router.patch('/:id', getService, async (req, res) => {
  if (req.body.name != null) {
    res.service.name = req.body.name;
  }
  if (req.body.url != null) {
    res.service.url = req.body.url;
  }
  if (req.body.timeout != null) {
    res.service.timeout = req.body.timeout;
  }

  try {
    const updatedService = await res.service.save();
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a service by ID
router.delete('/:id', getService, async (req, res) => {
  try {
    await res.service.remove();
    res.status(204).json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getService(req, res, next) {
  let service;
  try {
    service = await serviceModel.findById(req.params.id);
    if (service == null) {
      return res.status(404).json({ message: 'Service not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.service = service;
  next();
}

module.exports = router;
