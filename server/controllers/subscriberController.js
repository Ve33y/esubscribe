const subscriberController = {};
const db = require('../model/subscriberModel');
const nodemailer = require('nodemailer');

subscriberController.postSubscriber = async (req, res, next) => {
  const { subscriber, topic } = req.body;

  try {
    const text = 'INSERT INTO subscribers (subscriber_email, topic) VALUES ($1, $2);';
    const params = [subscriber, topic];
    const result = await db.query(text, params);
    res.locals.result = result;
    return next();
  } catch (e) {
    console.log(err);
    return next(err);
  }
};

subscriberController.postBroadcast = async (req, res, next) => {
  const { topic, message } = req.body;

  try {
    const text = 'INSERT INTO messages (topic, message) VALUES ($1, $2) RETURNING *';
    const params = [topic, message];
    const result = await db.query(text, params);
    res.locals.data = result.rows[0]; 
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

subscriberController.getAllSubscribers = async (req, res, next) => {
  const { topic } = req.body;

  try {
    const text = 'SELECT * FROM subscribers WHERE topic=$1';
    const params = [topic];
    const result = await db.query(text, params);
    res.locals.subscribers = result.rows.map(subscriber => subscriber.subscriber_email);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

subscriberController.sendMail = (req, res, next) => {
  const data = res.locals.data;
  const subscribersToSendTo = res.locals.subscribers;
  if(subscribersToSendTo.length === 0) throw new Error(`No subscribers`);

  const main = async (someData, recepients) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "",
        pass: ""
      }
    });
      // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: `${recepients}`, // list of receivers
      subject: `Hello ✔ ${someData.topic} subscriber`, // Subject line
      text: `${someData.topic}`, // plain text body
      html: `Here is the latest message: <b>${someData.message}</b>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }

  main(data, subscribersToSendTo).catch(console.error);
  next();
}

module.exports = subscriberController;