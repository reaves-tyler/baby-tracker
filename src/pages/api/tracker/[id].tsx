import connectDB from '../../../middleware/mongodb';
import Tracker from '../../../models/tracker';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { id } = req.query;
        const item = await Tracker.findById(id);

        return res.status(200).send(item);
    }

    if (req.method === 'PATCH') {
        const { id } = req.query;
        const item = await Tracker.findByIdAndUpdate(id, req.body);

        return res.status(200).send(item);
    }

    if (req.method === 'DELETE') {
        const { id } = req.query;
        const item = await Tracker.deleteOne({ _id: id });

        return res.status(200).send(item);
    }
};

export default connectDB(handler);
