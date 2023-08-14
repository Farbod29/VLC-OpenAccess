const mongoose = require('mongoose');

mongoose.Promise = Promise; // Set mongoose to use ES6 Promises.

const dbURI =
  'mongodb+srv://Farbod:9PXXXXXXXXXREMOVEDInPublicMode@cluster0.ir9e6.mongodb.net/COMPANION?retryWrites=true&w=majority';
const reconnectTimeout = 5000; // ms.
var reconnectCount = 1;
function connect() {
  mongoose
    .connect(dbURI, {
      auto_reconnect: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch(() => {}); // Catch the warning, no further treatment is required
  // because the Connection events are already doing this
  // for us.
}

const db = mongoose.connection;

db.on('connecting', () => {
  console.info('Connecting to MongoDB...');
});

db.on('error', (error) => {
  console.error(
    `---------------- try to reconnect : #${reconnectCount} ---------------- `
  );
  console.error(`MongoDB connection error: ${error}`);
  console.error(
    `^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ `
  );
  reconnectCount++;
  mongoose.disconnect();
});

db.on('connected', () => {
  console.info('Connected to MongoDB!');
});

db.once('open', () => {
  console.info('MongoDB connection opened!');
});

db.on('reconnected', () => {
  console.info('MongoDB reconnected!');
});

db.on('disconnected', () => {
  console.error(
    `MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`
  );
  setTimeout(() => connect(), reconnectTimeout);
});

connect();
