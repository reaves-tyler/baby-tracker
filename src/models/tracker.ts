import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const TrackerSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
});

// https://github.com/dherault/serverless-offline/issues/258#issuecomment-501000703
let tracker;
const collection = process.env.MONGO_COLLECTION;

try {
    tracker = mongoose.connection.model(collection);
} catch (e) {
    tracker = mongoose.model(collection, TrackerSchema);
}

export default tracker;
