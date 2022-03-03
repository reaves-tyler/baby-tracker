import connectDB from '../../../middleware/mongodb';
import Tracker from '../../../models/tracker';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { type } = req.body;
        if (type) {
            try {
                var tracker = new Tracker({
                    type: type,
                    time: new Date().toJSON(),
                });

                var created = await tracker.save();
                return res.status(200).send(created);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        } else {
            res.status(422).send('data_incomplete');
        }
    }
};

export default connectDB(handler);
