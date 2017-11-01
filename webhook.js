const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

/* For Facebook Validation */
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'tuxedo_cat') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});

/* Handling all messenges */
app.post('/webhook', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
			console.log('before sendmessage');
          sendMessage(event);
        }
      });
    });
    res.status(200).end();
  }
});


const request = require('request');

function sendMessageSimpleBOT(event) {
  let sender = event.sender.id;
  let text = event.message.text;

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: 'EAAB4CMZCFbpEBAMx7x1b84AJ2JPxD5aP705ymNpzINmiVeLevyNXWaIRJIMyM0Eq3AB7Pi1kOqD4ZCcRmsgdl7DtyDmRmwb0hGtZCEdYklNpn3E5V9KUPZB93mrdcLfohdAOesp5tAYf8L2oolIWwxMQJHoS0aIEILWetnvKhQZDZD'},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: {text: text}
    }
  }, function (error, response) {
    if (error) {
        console.log('Error sending message: ', error);
    } else if (response.body.error) {
        console.log('Error: ', response.body.error);
    }
  });
}



// Api Token you will get from API.AI Agent
const apiaiApp = require('apiai')('CLIENT_ACCESS_TOKEN FROM api.ai');


function sendMessage(event) {
  let sender = event.sender.id;
  let text = event.message.text;

  let apiai = apiaiApp.textRequest(text, {
    sessionId: 'tabby_cat' // use any arbitrary id
  });

  apiai.on('response', (response) => {
    // Got a response from api.ai. Let's POST to Facebook Messenger
	

  let aiText = response.result.fulfillment.speech;

  // Use Facebook Token
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token: 'FACEBOOK_PAGE_ACCESS_TOKEN'},
      method: 'POST',
      json: {
        recipient: {id: sender},
        message: {text: aiText}
      }
    }, (error, response) => {
      if (error) {
          console.log('Error sending message: ', error);
      } else if (response.body.error) {
          console.log('Error: ', response.body.error);
      }
    });
 
	
	
  });

  apiai.on('error', (error) => {
    console.log(error);
  });

  apiai.end();
}