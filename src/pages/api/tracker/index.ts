import connectDB from '../../../middleware/mongodb';
import Tracker from '../../../models/tracker';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const items = await Tracker.find();

        return res.status(200).send(items.reverse());
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
