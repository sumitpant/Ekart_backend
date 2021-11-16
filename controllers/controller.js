const axios = require('axios');
const asyncWrapper = require('../middlewares/async');
const Contact = require('../models/addressModel');
const User =require('../models/address');







const getAddress = asyncWrapper(async (req, res, next) => {
    const authHeader =req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
 

    if(token == null){
        return next(createCustomError(`No token `,401))
    }
    else{    
            const response= await axios.post('http://localhost:3030/verify',{token});
          
    
            if(response.data.msg ==="Verified"){
              let allAddress =await User.findOne({userid: response.data.user}).exec()

              if(!allAddress){
                return next(createCustomError(`No Such user `,401))
              }
                
                
                return res.status(200).json({address:allAddress._doc.contact});
            }

          else{

              return next(createCustomError('Auth expired',401));
          } 

    } 
});

const addAddress = asyncWrapper(async (req, res, next) => {
    const authHeader =req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("helloe",req.body.contact)

    if(token == null){
        return next(createCustomError(`No token `,401))
    }
    else{    
            const response= await axios.post('http://localhost:3030/verify',{token});
    
            if(response.data.msg ==="Verified"){

              let update =await Contact.findOneAndUpdate({userid: response.data.user},
                { "$push": { "contact": req.body.contact} },
                { new : true ,runValidators: true}
               
                ).exec();
                console.log("update",update)
                
                return res.status(200).json({msg: `User details updated with ${update}`});
            }

          else{

              return next(createCustomError('Auth expired',401));
          }
        
    

    }    
})


const modifyAddress = async (req, res, next) =>{

    const authHeader =req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        return next(createCustomError(`No token `,401))
    }
    else{    
            const response= await axios.post('http://localhost:3030/verify',{token});
    
            if(response.data.msg ==="Verified"){
              let update =await Contact.findOneAndUpdate({userid: response.data.user},req.body,
                {
                    new: true,
                    runValidators: true
                }
                ).exec();
            
                
                return res.status(400).json({msg: `User details updated with ${update}`});
            }

          else{

              return next(createCustomError('Auth expired',401));
          } 

    }   
 
}

module.exports = {
    getAddress, addAddress,modifyAddress
}