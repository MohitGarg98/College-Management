const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: String,
    pdf: String
})

// const Assignment = new mongoose.model('Assignment', assignmentSchema);
module.exports = new mongoose.model('Assignment', assignmentSchema);

// module.exports = Assignment;