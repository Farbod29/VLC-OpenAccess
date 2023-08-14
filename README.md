# VIRTUAL LEARNING COMPANION

![Alt Text](./Architecture.png)

VLC-Middleware - VLC-FrontEnd (chrome Extention)- Companion Chrome Extension - RIV-OCR service - NLP service

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

InstaCour:

https://rias-insta-simulate.vercel.app/

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

## Acknowledgement 

This repository belongs to the Courage project, in which Farbod Aprin actively participated since 2010. He developed it to fulfill the objectives of his thesis and as a foundation for analysis. The "Courage" initiative involves European scholars creating an educational environment to empower adolescents with skills to effectively address discrimination and harmful social media content, encompassing fake news, conspiracy theories, hate speech, and cyber-harassment. The initiative prioritizes fostering self-protection, resilience, and critical thinking to effectively counter these challenges. As an integral part of the project, the Virtual Learning Companion (VLC), designed by Farbod Aprin under the supervision of the RIAS institute, serves as a versatile chrome plugin and adaptable chatbot aimed at mitigating harmful content. The VLC incorporates innovative scenarios, gamification strategies, and counter-narratives to amplify users' awareness and engagement. By integrating "Reverse Image Search," the VLC effectively tackles misinformation by providing diverse contextual data derived from manipulated images. Distinguished from AI techniques, this approach revolves around human-centric methodologies, highlighting the importance of recognizing fake news through educational means. The study delves into the Intelligent Tutoring System tradition, delving into experimentation with recommendations offered by the VLC to learners, based on data collected from school trials. For more information, visit couragecompanion.eu.


