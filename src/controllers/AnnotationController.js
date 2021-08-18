const Annotation = require('../models/AnnotationData');

module.exports = {

    async read(req, res) {
        const annotationList = await Annotation.find();
        return res.json(annotationList);
    },

    async create(req, res) {
        const { title, notes, priority } = req.body;

        if (!title || !notes) {
            return res.status(400).json({
                error: "Necessário um titulo/anotação!"
            });
        }

        const annotationCreated = await Annotation.create({
            title,
            notes,
            priority
        });

        return res.json(annotationCreated);
    },

    async delete(req, res) {
        const { id } = req.params;
        const annotationDeleted = await Annotation.findOneAndDelete({ _id: id });

        if (annotationDeleted) {
            return res.json(annotationDeleted);
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
            return res.json(annotation);
        }
        return res.json({
            error: "Não foi possível localizar a anotação."
        })
    }
}