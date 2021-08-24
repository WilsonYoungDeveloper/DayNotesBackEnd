const mongoose = require('mongoose');

const AnnotationDataSchema = new mongoose.Schema({
    title: String,
    notes: String,
    priority: Boolean,
    userId: String
})

module.exports = mongoose.model('annotations', AnnotationDataSchema);