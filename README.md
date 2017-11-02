# FaceBookCahtBot
FaceBookCahtBot

Make Sure you have already Installed Node JS Server and NJROK (For creating tunnle).


We require tunnle because Facebook Api require secure url. So flow will be like,
Facebook messanger will connect to NGRok tunnle and ngrok is connect to your local node js server , then response will go to back to facebook messanger from local node js server via http request.



I choose ngrok to serves a localhost to a public URL because it is simple and easy to use. This URL will be used as a Messenger webhook endpoint during the development, so you don’t need to deploy to a server until the app is completed.

Download ngrok, install it on your machine, and run with a port number, let’s use 5000:

$ ngrok http 5000
When you start ngrok, it will display a public URL of your tunnel in the terminal. We will need the URL later when setting up the Facebook app. (In the screenshot, the URL is https://47ba4dd4.ngrok.io)

1) Simple Chat Bot(Reply with same message)
-----------------------------------------------------
Writing a Webhook with Express.js

Create your app directory and set up your Node.js app:

$ npm init
Once you configure your app, install Express and body-parser:

$ npm install express body-parser --save
Let’s create a webhook.js, and instantiate express and listen the server to port 5000, or whatever the port you have set with ngrok:

Writing a Super Simple Chat Bot

Install request to POST messages:

$ npm install request --save


2. Using API.ai with Your Facebook Messenger Bot
-----------------------------------------------------

API.ai allows developers to integrate your app with the AI system with speech-to-text and natural language processing.

Let’s get started with API.ai by sigining up.

Once you get your account, create an agent. You can either click the button that says CREATE AGENT or from the menu.

Enable Small Talk Features for Your agent.(Take Client access token and placed into webhook.js)

$ npm init
Once you configure your app, install Express and body-parser:


Run node webhook.js

Check with your Messange Bot :)

To get More details you can feed http://www.girliemac.com/feed.xml
