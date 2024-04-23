const Game = require('./historial-model');
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/records';

class recordRepository {
    constructor() {
        mongoose.connect(mongoURI);
    }

    async getGameRecord(user) {
        try {
            if (user != null) {
                const records = await Game.find({ user: user._id });

                return records;
            }
        } catch (error) {
            console.error("Error in record repository");
            return null;
        }
    }

    async saveGame(game) {
        try {
            if(game != null) {
                await game.save();
            }
        }catch (error){
            console.error("Error in record repository");
        }
    }

    async close() {
        mongoose.connection.close();
    }
}

module.exports = recordRepository;