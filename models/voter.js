const mongoose = require('mongoose');

const { Schema } = mongoose;

const voterSchema = new Schema({
    voterId : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
});

module.exports = mongoose.model('voter', voterSchema);