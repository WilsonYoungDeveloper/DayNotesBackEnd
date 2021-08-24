const Annotations = require('../models/AnnotationData');
const jwt = require('jsonwebtoken');
// const expiresIn = 300;
// const secret = 'wilsontools';

module.exports = {

    async read(req, res) {
        let priority = req.query.priority;
        let userId = req.userId;

        const priorityNotes = await Annotations.find({ priority: priority, userId: userId });
        let token = jwt.sign({ userId: userId }, secret, { expiresIn: expiresIn });
        return res.json({ priorityNotes, auth: true, token });
    },

    async update(req, res) {

        const { id } = req.params;
        const annotation = await Annotations.findOne({ _id: id });
        let userId = req.userId;

        if (annotation.priority) {
            annotation.priority = false;
        }
        else {
            annotation.priority = true;
        }
        await annotation.save();
        let token = jwt.sign({ userId: userId }, secret, { expiresIn: expiresIn });

        return res.json({ annotation, auth: true, token });
    }
}