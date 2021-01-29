const express = require('express');
const subscriberController = require('./controllers/subscriberController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/subscribe', subscriberController.postSubscriber, (req, res) => {
  return res.status(200).send('success');
});

app.post('/api/broadcast', subscriberController.postBroadcast, subscriberController.sendMail, (req, res) => {
  return res.status(200).send('success');
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;