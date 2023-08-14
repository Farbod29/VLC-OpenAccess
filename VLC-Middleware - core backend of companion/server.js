const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const conversationRouter = require('./controller/conversation.js');
const companionRouter = require('./controller/companion.js');
const metadataRouter = require('./controller/metadata.js');
const userRouter = require('./controller/users');
const checkUser = require('./controller/checkUser.js');
const checkchat = require('./controller/checkchat');
const experienceCounter = require('./controller/experienceCounter');
const clickLoggerRouter = require('./controller/clickLoggerController');
const openTabsAndCounts = require('./controller/openTabsAndCounts.js');
const HighlightedTextManager = require('./controller/HighlightedTextManager');
const DeletedHighlightedAPI = require('./controller/DeletedHighlightedAPI');
const AddHighlightedAPIForLL = require('./controller/AddHighlightedAPIForLL');

const router = express.Router();
const app = express();

require('events').EventEmitter.prototype._maxListeners = 100;
require('./mongoose.js');

const API_PORT = 3005;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//APIs utilizing controllers
app.use('/conversation', conversationRouter);
app.use('/users', userRouter);
app.use('/clicklogger', clickLoggerRouter);
app.use('/metadata', metadataRouter);
app.use('/checkuser', checkUser);
app.use('/checkchat', checkchat);
app.use('/opentabsandtheircounts', openTabsAndCounts);
app.use('/experiencecounter', experienceCounter);
app.use('/companion', companionRouter);
app.use('/HighlightedTextsArray', HighlightedTextManager);
app.use('/DeletedHighlightedAPI', DeletedHighlightedAPI);
app.use('/AddHighlightedAPIForLL', AddHighlightedAPIForLL);
app.use('/api', router);
app.use('/', router);
// app.use('/dashboardVotes', dashboardVotes);

//Require image routes

//Require image routes
require('./routes/image.experience')(app);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

/***
 *
 * Mongo DB connection
 * mongodb+srv://Farbod:<password>@cluster0.ir9e6.mongodb.net/test compas app !
 * const dbRoute = "mongodb+srv://Farbod:XXXXXremoveInPublicmode@cluster0.ir9e6.mongodb.net/COMPANION?retryWrites=true&w=majority";
 * connect with compass mongodb+srv://Farbod:XXXXXremoveInPublicmode@cluster0.ir9e6.mongodb.net/test
 * mongodb+srv://Farbod:XXXXXremoveInPublicmode@cluster0.ir9e6.mongodb.net/COMPANION?retryWrites=true&w=majority
 * mongodb+srv://Farbod:XXXXXremoveInPublicmode@cluster0.ir9e6.mongodb.net/test
 *
 */
