const dns = require('dns');
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// Node on this machine resolves via 127.0.0.1, which refuses Atlas SRV lookups
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
