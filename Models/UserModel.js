const mongoose = require('mongoose');

const Notes = require('../Models/NotesModel');

const UsersSchema = mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required: true
    },
    notes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : Notes
    }   
    ]
})

const users = mongoose.model('users',UsersSchema)

module.exports = users