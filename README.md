# COMPANION

Middleware - Companion Chrome Extension - RIV-OCR service - NLP service

This project has tree main module:

Frontend ==> LC-Chrome-Extension
Middleware service ==> Middleware - core backend of companion
Natural Language Processing microservice ==> NLP-processing-Microservice

## HOW TO RUN EXTENSION

Do the following steps
1.npm install
2.npm run build
3.build folder will be created, just add this build folder as unpacked chrome extension

to install the node modules like @material-ui/core/Chip
in the LC-Chrome-Extension run "npm i"

### Test Environment:

https://pixelfed.de/

#### PixelFed:

compextentiontest@gmail.com

#### Username:

CompanionTest

#### Pass:

CompanionTest123

https://www.instagram.com/compextentiontest/

#### Instagram:

compextentiontest@gmail.com

#### username:

compextentiontest
CompanionTest

Pass:

#### CompanionTest123

## HOW TO RUN backend (Middleware)

create free version of mongodb atlas:
https://www.mongodb.com/cloud/atlas/register
add your key as .env file or paste the url of your key in server.js file.

to run main => npm run start:main (it will take mongo db url from .env.main)
to run dev => npm run start:developement(it will take mongo db url from .env.developement)

## HOW TO RUN backend (NLP)

npm i
node server.js on port 8080

### Errors that you might have !

to kill all the background node process:
killall node

### Curent Approch !

## To DO

chat history need refresh after right click !
