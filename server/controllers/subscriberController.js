const subscriberController = {};
const db = require('../model/subscriberModel');

subscriberController.postSubscriber = (req, res, next) => {
  const { subscriber, topic } = req.body;
  const params = [subscriber, topic]
  const text = 'INSERT INTO subscribers (subscriber_email, topic) VALUES ($1, $2);';

  db
    .query(text, params)
    .then((returnedData) => {
      res.json(returnedData);
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

module.exports = subscriberController;