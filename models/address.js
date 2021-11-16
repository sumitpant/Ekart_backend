const mongoose = require('mongoose');
const User = new mongoose.Schema({
    userid : {
        type: String, 
        required :[true ,'userid required']
    }
})
module.exports =mongoose.model('Contact',User, 'logins')