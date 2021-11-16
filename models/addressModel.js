const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    city:{
        type:String,
        required : [true , 'Must Provide city'],
        trim : true,
        maxLength:[20]
    },
    state:{
        type:String,
        required:[true , 'Password cannot be empty'],
        minLength:[8 , 'Password must be atleast 8 characters']
    },
    pincode :{
        type: Number,
        required:[true,'Pincode is required'],
        minLength:[6,'Pincode is of 6 chars'],
        maxLength:[6,'Pincode is of 6 chars'],
        
    },
    phoneNumber :{
        type:Number,
        required:[true,'Phone number must be present'],
        minlength:[10,'Phone number must be atleast 10 characters'],
        maxLength:[10,'Phone number must be atleast 10 characters']
    },
    address:{
        type:String,
        required:[true, 'Address must be present'],
        minLength:[10 ,'Addreess must be min 20 long']
    }

})
const Contact = new mongoose.Schema({
    userid:{
        type: String
    },
    contact : {
        type: [addressSchema], 
        required :[true ,'Address required']
    }
})
module.exports =mongoose.model('Address',Contact, 'logins')