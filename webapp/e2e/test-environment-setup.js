const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('./user-model');
const bcrypt = require('bcrypt');

let mongoserver;
let userservice;
let authservice;
let gatewayservice;
let questionservice;
let historialservice;

async function startServer() {
    console.log('Starting MongoDB memory server...');
    mongoserver = await MongoMemoryServer.create();
    const mongoUri = mongoserver.getUri();
    process.env.MONGODB_URI = mongoUri;
    
    // Add the user for the tests, if the user already exists, it will not be added
    await mongoose.connect(mongoUri);
    const existingUser = await User.findOne({ username: "userTests" });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("MaMaMM3454*/==45asdfgh", 10);
      const newUser = new User({
              username: "userTests",
              password: hashedPassword,
      });
      await newUser.save();
    }

    userservice = await require("../../users/userservice/user-service");
    authservice = await require("../../users/authservice/auth-service");
    gatewayservice = await require("../../gatewayservice/gateway-service");
    questionservice = await require("../../questionsgenerator/questions-service");
    historialservice = await require("../../record/historial-service");


  }

  startServer();