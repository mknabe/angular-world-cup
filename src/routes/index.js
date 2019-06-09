const integrationService = require('../services');

module.exports = {
  index: (req, res) => {
    integrationService.loadData().then(data => {
      res.render('index', {
        world_cup_data: JSON.stringify(data)
      });
    });
  },
  data: (req, res) => {
    integrationService.loadData().then(data => {
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  }
};