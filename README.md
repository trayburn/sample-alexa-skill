# Creating an Alexa Skill in AWS Lambda

## Development Environment Setup

This project assumes that the following global packages are available, 
if you have not previously installed these packages then please 
execute the following commands:

```
npm install gulp-cli -g
npm install nodemon -g
```

## How Source Is Organized

### Skills

Each Alexa Skill is located in a folder within the `apps` folder.  
So for instance the `hello-world` skill is in `./apps/hello-world`, 
and the `podcast` skill is in the `./apps/podcast` folder.

Each of those skills it it's own package, with it's own `package.json`
file, and corresponding `node_modules` directory.  This is done so that
when the skill is packaged up by gulp, all required dependencies are 
within the subdirectory.

At their core, each of these skills uses the package `alexa-app` to
handle the creation of the various endpoints expected by the Alexa 
Skills Kit (ASK).

### Server

In addition to the code for the skills, this project contains a 
development server.  The code for this is in the file `./index.js` and
uses the `alexa-app-server` package.  This server is not deployed to
lambda, and exists solely to make local development easier. 

## Testing

While running the development server provides a good baseline for testing
intents and their responses, it is not perfect.  Indeed of the various 
ways to test, nothing is as sure a test as a real device.  Here are some ways
you can test :

* Development Server : http://localhost:4000/alexa/skill-name-here
* Echoism : https://echosim.io
* Actual Amazon Device (i.e. Echo, Dot or Tap)

## Deployment

When it is time to deploy the code to AWS Lambda, simply type `gulp` and each
of the apps will be zipped up and put in the `./lambda` folder for upload to AWS.

