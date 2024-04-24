const Game = require('./historial-model');
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/records';

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
            console.error("Error in record repository: ", error);
        }
    }

    async saveGame(game) {
        try {
            if (game != null) {
                const validationError = game.validateSync();
                if (validationError) {
                    return false;
                }
                await game.save();
                return true;
            }
        } catch (error) {
            console.error("Error in record repository: ", error);
        }
    }

    async close() {
        mongoose.connection.close();
    }
}

module.exports = recordRepository;