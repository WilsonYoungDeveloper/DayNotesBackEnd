const Annotation = require('../models/AnnotationData');
const jwt = require('jsonwebtoken');
// const expiresIn = 300;
// const secret = 'wilsontools';

module.exports = {

    async read(req, res) {
        const annotationList = await Annotation.find({ userId: req.userId });
        let userId = req.userId;
        let token = jwt.sign({ userId: userId }, secret, { expiresIn: expiresIn });
        return res.json({ annotationList, auth: true, token });
    },

    async create(req, res) {

        const { title, notes, priority } = req.body;
        let userId = req.userId;

        if (!title || !notes) {
            return res.status(400).json({
                error: "Necessário um titulo/anotação!"
            });
        }

        const annotationCreated = await Annotation.create({
            title,
            notes,
            priority,
            userId
        });
        let token = jwt.sign({ userId: userId }, secret, { expiresIn: expiresIn });

        return res.json({ annotationCreated, auth: true, token });
    },

    async delete(req, res) {
        const { id } = req.params;
        const annotationDeleted = await Annotation.findOneAndDelete({ _id: id });

        if (annotationDeleted) {
            let userId = req.userId;
            let token = jwt.sign({ userId: userId }, secret, { expiresIn: expiresIn });
            return res.json({ annotationDeleted, auth: true, token });
        }
        return res.status(401).json({ error: "Não foi encontrado o regsitro para deletear!" })
    },

    async update(req, res) {
        const { id } = req.params;
        const { notes } = req.body;

        const annotation = await Annotation.findOne({ _id: id });

        if (annotation) {
            if (notes) {
                annotation.notes = notes;
                await annotation.save();
            }
            let userId = req.userId;
            let token = jwt.sign({ userId: userId }, secret, { expiresIn: expiresIn });
            return res.json({ annotation, auth: true, token });
        }
        return res.json({
            error: "Não foi possível localizar a anotação."
        })
    }
}