const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    user : {
        _id : {
            type : String,
            required : true
        },
        name : {
            type : String,
            required : true
        }
    }
},{
    timestamps: true
})

const notes = mongoose.model('notes',notesSchema);

module.exports = notes;