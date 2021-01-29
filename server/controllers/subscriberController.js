const subscriberController = {};
const db = require('../model/subscriberModel');
const nodemailer = require('nodemailer');


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

subscriberController.sendMail = (req, res, next) => {
  const data = res.locals.data;

  const main = async (someData) => {
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
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: `Hello ✔ ${someData.topic}`, // Subject line
      text: `${someData.topic}`, // plain text body
      html: `<b>${someData.message}</b>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }

  main(data).catch(console.error);
  next();
}

module.exports = subscriberController;